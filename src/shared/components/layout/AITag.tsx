import * as React from "react";
import { Sparkles } from "lucide-react";
import { t } from "@/shared/constants/tokens";

export function AITag() {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      padding: "2px 10px",
      borderRadius: "999px",
      background: "rgba(124, 58, 237, 0.10)",
      border: "1px solid rgba(124, 58, 237, 0.20)",
      color: t.ai,
      fontSize: "0.6875rem",
      fontWeight: 600,
    }}>
      <Sparkles size={9} /> مُولَّد بالذكاء الاصطناعي
    </span>
  );
}
