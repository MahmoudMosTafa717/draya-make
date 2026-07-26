import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rect" | "circle";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = "rect",
  style = {},
  className = "",
  ...props
}) => {
  const borderRadius =
    variant === "circle" ? "50%" : variant === "text" ? "4px" : "8px";

  const skeletonStyle: React.CSSProperties = {
    display: "block",
    width: width ?? "100%",
    height: height ?? (variant === "text" ? "14px" : "100px"),
    borderRadius,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    animation: "draya-shimmer 1.5s infinite ease-in-out",
    ...style,
  };

  return (
    <div
      style={skeletonStyle}
      className={`relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent ${className}`}
      {...props}
    />
  );
};
