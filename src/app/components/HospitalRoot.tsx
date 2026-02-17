import { Outlet, Navigate } from "react-router";
import { HospitalSidebar } from "./HospitalSidebar";
import { HospitalBottomNav } from "./HospitalBottomNav";

export function HospitalRoot() {
  const isLoggedIn = localStorage.getItem("warfarin_logged_in") === "true";
  const userRole = localStorage.getItem("warfarin_role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but not as hospital staff, redirect to patient
  if (userRole !== "hospital") {
    return <Navigate to="/patient/dashboard" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <HospitalSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      <HospitalBottomNav />
    </div>
  );
}