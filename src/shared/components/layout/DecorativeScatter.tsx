import * as React from "react";
import { BookOpen, GraduationCap, Pencil, Star, Zap, BookMarked, Atom } from "lucide-react";

export interface DecorativeScatterProps {
  color?: string;
  opacity?: number;
  density?: "sparse" | "normal" | "dense";
}

export function DecorativeScatter({
  color = "#5FA79A",
  opacity = 0.08,
  density = "normal",
}: DecorativeScatterProps) {
  const icons = [
    { Icon: BookOpen,      top: "8%",  right: "6%",  size: 42, rot: -15 },
    { Icon: GraduationCap, top: "15%", left: "4%",   size: 36, rot: 10  },
    { Icon: Pencil,        top: "55%", left: "2%",   size: 28, rot: -20 },
    { Icon: Star,          top: "70%", right: "8%",  size: 22, rot: 12  },
    { Icon: Atom,          top: "30%", right: "3%",  size: 32, rot: 5   },
    { Icon: BookMarked,    top: "80%", left: "6%",   size: 30, rot: -8  },
    ...(density === "dense" ? [
      { Icon: Zap,         top: "45%", right: "12%", size: 24, rot: 18  },
      { Icon: BookOpen,    top: "90%", right: "15%", size: 26, rot: -5  },
    ] : []),
  ];
  
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {icons.map(({ Icon, top, right, left, size, rot }, i) => (
        <div
          key={i}
          style={{
            position: "absolute", top, right, left,
            opacity,
            transform: `rotate(${rot}deg)`,
            color,
          }}
        >
          <Icon size={size} strokeWidth={1.25} />
        </div>
      ))}
    </div>
  );
}
