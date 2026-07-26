import * as React from "react";
import { Outlet } from "react-router";

export const PublicLayout: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Outlet />
    </div>
  );
};
export default PublicLayout;
