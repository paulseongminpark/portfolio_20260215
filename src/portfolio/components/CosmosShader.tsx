import { useRef, useEffect, useState } from 'react';

// Evening palette (25 types from shared.js)
const PALETTE = [
  [0.40,0.28,0.62],[0.90,0.65,0.15],[0.85,0.50,0.15],[0.88,0.35,0.18],
  [0.20,0.25,0.58],[0.58,0.32,0.58],[0.18,0.38,0.52],[0.28,0.32,0.55],
  [0.35,0.42,0.48],[0.48,0.45,0.30],[0.75,0.48,0.22],[0.65,0.20,0.22],
  [0.30,0.45,0.50],[0.52,0.35,0.52],[0.30,0.38,0.52],[0.50,0.42,0.35],
  [0.42,0.25,0.60],[0.25,0.45,0.52],[0.38,0.38,0.48],[0.82,0.62,0.12],
  [0.62,0.22,0.28],[0.50,0.38,0.55],[0.38,0.50,0.35],[0.35,0.35,0.55],
  [0.60,0.55,0.18],
];

// Bombay palette (8 edge colors)
const BOMBAY = [
  [0.10,0.15,0.40],[0.16,0.33,0.71],[0.24,0.56,0.60],[0.49,0.78,0.78],
  [0.78,0.88,0.75],[0.96,0.84,0.63],[0.94,0.66,0.41],[0.95,0.78,0.28],
];

const NODE_COUNT = 4962;
const EDGE_SAMPLES = 800;

const NODE_VS = `
attribute vec2 aPos;
attribute vec3 aColor;
attribute float aBirth;
attribute float aSize;
attribute vec2 aVel;
uniform float uTime;
uniform vec2 uRes;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float age = uTime - aBirth;
  vAlpha = clamp(age / 0.8, 0.0, 1.0);
  if (age < 0.0) vAlpha = 0.0;
  vColor = aColor;
  vec2 p = aPos + aVel * uTime;
  float breath = 1.0 + sin(uTime * 0.5 + aBirth * 3.0) * 0.02;
  p *= breath;
  float aspect = uRes.x / uRes.y;
  gl_Position = vec4(p.x / aspect, p.y, 0.0, 1.0);
  float pulse = 1.0 + sin(uTime * 1.5 + aBirth * 5.0) * 0.15;
  gl_PointSize = aSize * pulse * vAlpha * (uRes.y / 560.0);
}`;

const NODE_FS = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float dist = length(c);
  float core = smoothstep(0.5, 0.3, dist);
  float glow = exp(-dist * dist * 8.0) * 0.6;
  float intensity = core + glow;
  vec3 col = vColor * intensity * 0.9 + vColor * core * 0.25;
  float alpha = intensity * vAlpha;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(col, alpha);
}`;

const EDGE_VS = `
attribute vec2 aPos;
attribute vec3 aEdgeColor;
uniform float uTime;
uniform vec2 uRes;
varying float vEdgeAlpha;
varying vec3 vEdgeColor;
void main() {
  float aspect = uRes.x / uRes.y;
  float breath = 1.0 + sin(uTime * 0.5) * 0.02;
  vec2 p = aPos * breath;
  gl_Position = vec4(p.x / aspect, p.y, 0.0, 1.0);
  vEdgeColor = aEdgeColor;
  vEdgeAlpha = clamp((uTime - 3.0) / 3.0, 0.0, 1.0) * 0.24;
}`;

const EDGE_FS = `
precision mediump float;
varying float vEdgeAlpha;
varying vec3 vEdgeColor;
void main() {
  gl_FragColor = vec4(vEdgeColor, vEdgeAlpha);
}`;

function makeShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function makeProg(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, makeShader(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, makeShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
}

function makeBuf(gl: WebGLRenderingContext, data: Float32Array) {
  const b = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return b;
}

function attr(gl: WebGLRenderingContext, prog: WebGLProgram, name: string, buf: WebGLBuffer, size: number) {
  const loc = gl.getAttribLocation(prog, name);
  if (loc < 0) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
}

export function CosmosShader() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const glCtx = canvas.getContext('webgl', { alpha: false, antialias: true });
    if (!glCtx) return;
    const gl = glCtx;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Generate data
    const positions = new Float32Array(NODE_COUNT * 2);
    const colors = new Float32Array(NODE_COUNT * 3);
    const birthTimes = new Float32Array(NODE_COUNT);
    const sizes = new Float32Array(NODE_COUNT);
    const velocities = new Float32Array(NODE_COUNT * 2);

    for (let i = 0; i < NODE_COUNT; i++) {
      const isHub = Math.random() < 0.08;
      const r = isHub ? Math.random() * 0.3 : 0.1 + Math.pow(Math.random(), 0.6) * 0.85;
      const angle = Math.random() * Math.PI * 2 + i * 0.01;
      const cluster = Math.floor(Math.random() * 5);
      const cx = Math.cos(cluster * Math.PI * 2 / 5) * 0.3;
      const cy = Math.sin(cluster * Math.PI * 2 / 5) * 0.3;
      positions[i*2] = Math.cos(angle) * r + cx * (1 - r) * 0.5;
      positions[i*2+1] = Math.sin(angle) * r + cy * (1 - r) * 0.5;
      const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i*3] = col[0]; colors[i*3+1] = col[1]; colors[i*3+2] = col[2];
      birthTimes[i] = isHub ? Math.random() * 2.0 : 1.0 + Math.random() * 7.0;
      sizes[i] = isHub ? 3.0 + Math.random() * 4.0 : 1.0 + Math.random() * 2.5;
      velocities[i*2] = (Math.random() - 0.5) * 0.0003;
      velocities[i*2+1] = (Math.random() - 0.5) * 0.0003;
    }

    const edges = new Float32Array(EDGE_SAMPLES * 4);
    const edgeColors = new Float32Array(EDGE_SAMPLES * 6);
    for (let i = 0; i < EDGE_SAMPLES; i++) {
      const a = Math.floor(Math.random() * NODE_COUNT);
      let best = 0, bestDist = Infinity;
      for (let t = 0; t < 20; t++) {
        const b = Math.floor(Math.random() * NODE_COUNT);
        if (b === a) continue;
        const dx = positions[a*2] - positions[b*2];
        const dy = positions[a*2+1] - positions[b*2+1];
        const d = dx*dx + dy*dy;
        if (d < bestDist && d > 0.001) { bestDist = d; best = b; }
      }
      edges[i*4] = positions[a*2]; edges[i*4+1] = positions[a*2+1];
      edges[i*4+2] = positions[best*2]; edges[i*4+3] = positions[best*2+1];
      const bc = BOMBAY[i % BOMBAY.length];
      edgeColors[i*6] = bc[0]; edgeColors[i*6+1] = bc[1]; edgeColors[i*6+2] = bc[2];
      edgeColors[i*6+3] = bc[0]; edgeColors[i*6+4] = bc[1]; edgeColors[i*6+5] = bc[2];
    }

    const nodeProg = makeProg(gl, NODE_VS, NODE_FS);
    const edgeProg = makeProg(gl, EDGE_VS, EDGE_FS);
    const posBuf = makeBuf(gl, positions);
    const colBuf = makeBuf(gl, colors);
    const birthBuf = makeBuf(gl, birthTimes);
    const sizeBuf = makeBuf(gl, sizes);
    const velBuf = makeBuf(gl, velocities);
    const edgeBuf = makeBuf(gl, edges);
    const edgeColBuf = makeBuf(gl, edgeColors);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);

    const startTime = performance.now();
    let raf = 0;

    function render() {
      const t = ((performance.now() - startTime) / 1000) % 13; // 10s growth + 3s hold
      gl.clearColor(0.039, 0.039, 0.059, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const res: [number, number] = [canvas!.width, canvas!.height];

      // Edges
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(edgeProg);
      gl.uniform1f(gl.getUniformLocation(edgeProg, 'uTime'), t);
      gl.uniform2fv(gl.getUniformLocation(edgeProg, 'uRes'), res);
      attr(gl, edgeProg, 'aPos', edgeBuf, 2);
      attr(gl, edgeProg, 'aEdgeColor', edgeColBuf, 3);
      gl.drawArrays(gl.LINES, 0, EDGE_SAMPLES * 2);

      // Nodes
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.useProgram(nodeProg);
      gl.uniform1f(gl.getUniformLocation(nodeProg, 'uTime'), t);
      gl.uniform2fv(gl.getUniformLocation(nodeProg, 'uRes'), res);
      attr(gl, nodeProg, 'aPos', posBuf, 2);
      attr(gl, nodeProg, 'aColor', colBuf, 3);
      attr(gl, nodeProg, 'aBirth', birthBuf, 1);
      attr(gl, nodeProg, 'aSize', sizeBuf, 1);
      attr(gl, nodeProg, 'aVel', velBuf, 2);
      gl.drawArrays(gl.POINTS, 0, NODE_COUNT);

      raf = requestAnimationFrame(render);
    }
    render();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        const url = import.meta.env.DEV
          ? 'http://localhost:3333/experiments/15_ontology-cosmos/'
          : `${import.meta.env.BASE_URL}cosmos/`;
        window.open(url, '_blank');
      }}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const url = import.meta.env.DEV
            ? 'http://localhost:3333/experiments/15_ontology-cosmos/'
            : `${import.meta.env.BASE_URL}cosmos/`;
          window.open(url, '_blank');
        }
      }}
      style={{
        width: '70%',
        aspectRatio: '4 / 3',
        maxHeight: 420,
        margin: '0 auto',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0 0 40px rgba(100,140,220,0.25), 0 0 80px rgba(100,140,220,0.1)' : 'none',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 42,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        textShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        WATCH IT GROW
      </div>
      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#fff',
        fontSize: 13,
        letterSpacing: '0.06em',
        fontFamily: 'Inter, system-ui, sans-serif',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        whiteSpace: 'nowrap',
      }}>
        SHOW →
      </div>
    </div>
  );
}
