import * as React from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { Toaster } from "@/shared/components/ui/Toast";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" closeButton />
    </>
  );
}

export default App;
