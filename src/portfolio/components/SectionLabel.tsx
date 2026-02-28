import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}
export function SectionLabel({ children, dark }: SectionLabelProps) {
  return (
    <p className="p12-label" style={{ color: dark ? "rgba(255,255,255,0.35)" : "#777070" }}>
      {children}
    </p>
  );
}
