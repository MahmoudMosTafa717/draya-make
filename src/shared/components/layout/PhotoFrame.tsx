import * as React from "react";
import { t } from "@/shared/constants/tokens";

export interface PhotoFrameProps {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  shape?: "blob" | "squircle" | "tall-blob";
  style?: React.CSSProperties;
}

export function PhotoFrame({
  src, alt, width, height, shape = "blob",
  style: extraStyle = {},
}: PhotoFrameProps) {
  const masks: Record<string, string> = {
    blob:       "44% 56% 67% 33% / 44% 33% 67% 56%",
    squircle:   "40% 60% 55% 45% / 55% 40% 60% 45%",
    "tall-blob":"38% 62% 62% 38% / 58% 38% 62% 42%",
  };
  return (
    <div style={{
      width, height, flexShrink: 0, overflow: "hidden",
      borderRadius: masks[shape],
      boxShadow: t.shadow3,
      position: "relative",
      ...extraStyle,
    }}>
      <img
        src={src} alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}
