import { useNavigate } from "react-router";
import { Heart, Hospital, User, ArrowLeft } from "lucide-react";

export function RoleSelectionPage() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "hospital" | "patient") => {
    localStorage.setItem("warfarin_role", role);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-5xl relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>กลับหน้าหลัก</span>
        </button>

        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center shadow-xl shadow-primary/20 mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            เข้าสู่ระบบ <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Coaguard</span>
          </h1>
          <p className="text-lg text-muted-foreground">เลือกประเภทผู้ใช้งาน</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hospital Staff Card */}
          <button
            onClick={() => handleRoleSelect("hospital")}
            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/20 p-8 md:p-10 hover:border-primary/30 hover:shadow-primary/20 transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Hospital className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3">เจ้าหน้าที่โรงพยาบาล</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                สำหรับแพทย์ พยาบาล และเภสัชกร<br />
                จัดการข้อมูลผู้ป่วยและปรับขนาดยา
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>จัดการข้อมูลผู้ป่วยทั้งหมด</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>บันทึกค่า INR และปรับขนาดยา</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>ส่งการแจ้งเตือนถึงผู้ป่วย</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>วิเคราะห์ข้อมูลและสถิติ</span>
                </li>
              </ul>
              
              <div className="flex items-center justify-between text-primary font-semibold group-hover:translate-x-2 transition-transform">
                <span>เข้าสู่ระบบ</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          </button>

          {/* Patient Card */}
          <button
            onClick={() => handleRoleSelect("patient")}
            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/20 p-8 md:p-10 hover:border-emerald-500/30 hover:shadow-emerald-500/20 transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3">ผู้ป่วย</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                สำหรับผู้ป่วยที่ใช้ยา Warfarin<br />
                ติดตามสุขภาพและรับการแจ้งเตือน
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>ดูค่า INR และสถานะสุขภาพ</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>ตารางยาและการยืนยัน</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>รับการแจ้งเตือนแบบเรียลไทม์</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>ติดต่อโรงพยาบาลได้ทันที</span>
                </li>
              </ul>
              
              <div className="flex items-center justify-between text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>เข้าสู่ระบบ</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p className="mb-2">🔒 ระบบปลอดภัยตามมาตรฐานการแพทย์</p>
          <p>กระทรวงสาธารณสุข | Ministry of Public Health</p>
        </div>
      </div>
    </div>
  );
}
