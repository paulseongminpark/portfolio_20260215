interface LabRendererProps {
  raw: string;
}

export function LabRenderer({ raw }: LabRendererProps) {
  // ## 헤더로 섹션 분리
  const entries = raw.split(/^## /m).filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {entries.map((block, i) => {
        const lines = block.split("\n");
        const title = lines[0].trim();
        const rest = lines.slice(1).join("\n").trim();

        const imgMatch = rest.match(/!\[.*?\]\((.*?)\)/);
        const imgSrc = imgMatch ? imgMatch[1] : null;
        const text = rest.replace(/!\[.*?\]\(.*?\)/g, "").trim();

        return (
          <div
            key={i}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              {title}
            </h3>
            {text && (
              <p style={{ margin: 0, lineHeight: 1.7, color: "#444" }}>
                {text}
              </p>
            )}
            {imgSrc && (
              <img
                src={imgSrc.replace("./lab/", "/lab/")}
                alt={title}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #eee",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
