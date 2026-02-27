import { NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Users, BarChart3, LogOut, Heart } from "lucide-react";

export function HospitalSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("warfarin_logged_in");
    localStorage.removeItem("warfarin_role");
    navigate("/");
  };

  const navItems = [
    { path: "/hospital/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
    { path: "/hospital/analytics", icon: BarChart3, label: "วิเคราะห์ข้อมูล" },
  ];

  return (
    <aside className="w-72 bg-gradient-to-br from-primary via-primary to-secondary text-white flex flex-col shadow-2xl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Logo Section */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20">
            <Heart className="w-7 h-7 text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold">WafarinCare</h1>
            <p className="text-xs text-white/70">เจ้าหน้าที่โรงพยาบาล</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 relative z-10">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/hospital/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-4 rounded-2xl transition-all group ${
                    isActive
                      ? "bg-white text-primary shadow-lg shadow-white/20"
                      : "text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-white/70 group-hover:text-white'}`} />
                    <span className="font-semibold">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 relative z-10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl w-full text-white/80 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm group"
        >
          <LogOut className="w-5 h-5 text-white/70 group-hover:text-white" />
          <span className="font-semibold">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}
