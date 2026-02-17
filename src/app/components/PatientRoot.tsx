import { Outlet, Navigate } from "react-router";
import { PatientSidebar } from "./PatientSidebar";
import { PatientBottomNav } from "./PatientBottomNav";

export function PatientRoot() {
  const isLoggedIn = localStorage.getItem("warfarin_logged_in") === "true";
  const userRole = localStorage.getItem("warfarin_role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but not as patient, redirect to hospital
  if (userRole !== "patient") {
    return <Navigate to="/hospital/dashboard" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <PatientSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      <PatientBottomNav />
    </div>
  );
}