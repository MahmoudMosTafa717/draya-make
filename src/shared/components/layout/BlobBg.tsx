import * as React from "react";

export interface BlobBgProps {
  variant?: "light" | "dark" | "surface";
  className?: string;
}

export function BlobBg({ variant = "light", className = "" }: BlobBgProps) {
  const fill = variant === "dark" ? "#FFFFFF" : "#DCEEEA";
  const baseOp = variant === "dark" ? 0.06 : variant === "surface" ? 0.55 : 0.13;
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      {/* Large top-right blob */}
      <svg viewBox="0 0 560 480" style={{ position: "absolute", top: "-8%", left: "-4%", width: "54%", opacity: baseOp }} fill="none">
        <path d="M310 55 C400 10 490 70 510 165 C530 260 480 355 395 380 C310 405 205 370 165 285 C125 200 145 95 225 60 C258 43 280 70 310 55Z" fill={fill} />
      </svg>
      {/* Medium bottom-right blob */}
      <svg viewBox="0 0 420 380" style={{ position: "absolute", bottom: "-12%", right: "-6%", width: "42%", opacity: baseOp * 0.7 }} fill="none">
        <path d="M210 45 C275 18 355 55 375 130 C395 205 360 295 285 320 C210 345 125 310 95 238 C65 166 90 82 155 52 C175 43 194 52 210 45Z" fill={fill} />
      </svg>
      {/* Small accent blob */}
      <svg viewBox="0 0 240 220" style={{ position: "absolute", top: "35%", right: "28%", width: "22%", opacity: baseOp * 0.5 }} fill="none">
        <path d="M120 28 C158 10 200 38 210 80 C220 122 196 170 154 180 C112 190 68 165 55 124 C42 83 62 40 97 28 C107 24 113 31 120 28Z" fill={fill} />
      </svg>
    </div>
  );
}
