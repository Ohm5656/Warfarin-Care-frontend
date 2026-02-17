import { NavLink } from "react-router";
import { LayoutDashboard, BarChart3 } from "lucide-react";

export function HospitalBottomNav() {
  const navItems = [
    { path: "/hospital/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
    { path: "/hospital/analytics", icon: BarChart3, label: "วิเคราะห์" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-2xl z-50">
      <div className="grid grid-cols-2 gap-1 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/hospital/dashboard"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-br from-primary/10 to-secondary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
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
