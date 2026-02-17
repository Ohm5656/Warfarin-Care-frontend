import { NavLink } from "react-router";
import { LayoutDashboard, Calendar, History, AlertTriangle } from "lucide-react";

export function PatientBottomNav() {
  const navItems = [
    { path: "/patient/dashboard", icon: LayoutDashboard, label: "หน้าหลัก" },
    { path: "/patient/doses", icon: Calendar, label: "ตารางยา" },
    { path: "/patient/history", icon: History, label: "ประวัติ" },
    { path: "/patient/risk", icon: AlertTriangle, label: "แจ้งเตือน" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-2xl z-50">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/patient/dashboard"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600"
                  : "text-muted-foreground hover:bg-muted/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-semibold ${isActive ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
