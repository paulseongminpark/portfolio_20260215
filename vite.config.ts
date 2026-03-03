import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  base: process.env.VERCEL === '1' ? '/' : '/portfolio/',
  plugins: [
    react(),
    {
      name: 'save-layout',
      configureServer(server) {
        server.middlewares.use('/save-layout', (req, res) => {
          if (req.method !== 'POST') { res.end(); return; }
          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { positions, transform } = JSON.parse(body);
              const filePath = path.resolve(__dirname, 'public/orch-graph.html');
              let html = fs.readFileSync(filePath, 'utf-8');
              html = html.replace(
                /const SAVED_POSITIONS = \{[\s\S]*?\};/,
                `const SAVED_POSITIONS = ${JSON.stringify(positions, null, 2)};`
              );
              html = html.replace(
                /const INITIAL_TRANSFORM = .*?;/,
                `const INITIAL_TRANSFORM = ${JSON.stringify(transform)};`
              );
              fs.writeFileSync(filePath, html, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(e) }));
            }
          });
        });
      },
    },
  ],
  server: { watch: { usePolling: true } },
})
