import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import { t } from "@/shared/constants/tokens";

export const Toaster = SonnerToaster;

export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      style: {
        background: t.bgSurface,
        border: `1px solid ${t.success}`,
        color: t.textPrimary,
        fontFamily: "inherit",
      },
    });
  },
  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      style: {
        background: t.bgSurface,
        border: `1px solid ${t.error}`,
        color: t.textPrimary,
        fontFamily: "inherit",
      },
    });
  },
  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      style: {
        background: t.bgSurface,
        border: `1px solid ${t.info}`,
        color: t.textPrimary,
        fontFamily: "inherit",
      },
    });
  },
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      style: {
        background: t.bgSurface,
        border: `1px solid ${t.warning}`,
        color: t.textPrimary,
        fontFamily: "inherit",
      },
    });
  },
};
export { sonnerToast };
