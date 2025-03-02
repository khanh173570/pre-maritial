import { Outlet } from "react-router-dom";

function AdminApp() {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
}

export default AdminApp;
