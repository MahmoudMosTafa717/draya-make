import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { t } from "@/shared/constants/tokens";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) => {
  const maxWidthMap = {
    sm: "440px",
    md: "600px",
    lg: "800px",
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 27, 25, 0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
          }}
          className="animate-fade-in"
        />
        
        {/* Content container */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 1001,
            pointerEvents: "none",
          }}
        >
          <Dialog.Content
            style={{
              position: "relative",
              width: "100%",
              maxWidth: maxWidthMap[size],
              maxHeight: "85vh",
              backgroundColor: t.bgSurface,
              borderRadius: "16px",
              boxShadow: t.shadow3,
              border: `1px solid ${t.border}`,
              display: "flex",
              flexDirection: "column",
              outline: "none",
              pointerEvents: "auto",
              direction: "rtl",
            }}
            className="animate-slide-up"
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              {title ? (
                <Dialog.Title style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, margin: 0 }}>
                  {title}
                </Dialog.Title>
              ) : (
                <div style={{ flex: 1 }} />
              )}
              
              <Dialog.Close asChild>
                <button
                  aria-label="إغلاق"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: t.textSecondary,
                    padding: "4px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 150ms",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = t.bgMuted; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {/* Scrollable content area */}
            <div
              style={{
                padding: "24px",
                overflowY: "auto",
                flex: 1,
                fontSize: "0.9375rem",
                color: t.textPrimary,
                lineHeight: 1.6,
              }}
            >
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                style={{
                  padding: "16px 24px",
                  borderTop: `1px solid ${t.border}`,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  backgroundColor: t.bgSecondary,
                  borderRadius: "0 0 16px 16px",
                }}
              >
                {footer}
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { Dialog };
