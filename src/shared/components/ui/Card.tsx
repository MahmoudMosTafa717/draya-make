import * as React from "react";
import { t } from "@/shared/constants/tokens";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, interactive, onClick, style = {}, className = "", ...props }, ref) => {
    const cardStyle: React.CSSProperties = {
      background: t.bgSurface,
      borderRadius: "12px",
      border: `1px solid ${t.border}`,
      boxShadow: t.shadow1,
      transition: interactive ? "box-shadow 150ms, transform 150ms" : undefined,
      cursor: interactive ? "pointer" : undefined,
      ...style,
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        style={cardStyle}
        onMouseEnter={interactive ? e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = t.shadow2;
          el.style.transform = "translateY(-3px)";
        } : undefined}
        onMouseLeave={interactive ? e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = t.shadow1;
          el.style.transform = "translateY(0)";
        } : undefined}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
