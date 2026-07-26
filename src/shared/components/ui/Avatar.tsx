import * as React from "react";
import { t } from "@/shared/constants/tokens";

export interface AvatarProps {
  name: string;
  size?: number;
  src?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 36,
  src,
  style = {},
  className = "",
}) => {
  const initials = name
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("");

  return src ? (
    <img
      src={src}
      alt={name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        ...style,
      }}
      className={className}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: t.primary100,
        color: t.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size > 44 ? "1.0625rem" : "0.75rem",
        fontWeight: 700,
        flexShrink: 0,
        ...style,
      }}
      className={className}
    >
      {initials}
    </div>
  );
};
