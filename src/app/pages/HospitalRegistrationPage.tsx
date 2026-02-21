import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { UserPlus, Save, User, Shield, Stethoscope, Mail, Lock, Building } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router";

export function HospitalRegistrationPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "hospital">("patient");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    hospitalId: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log("Registering:", { ...formData, role });
    alert(`ลงทะเบียนสำเร็จ: ${role === "patient" ? "ผู้ป่วย" : "เจ้าหน้าที่"} ${formData.firstName}`);
    navigate("/hospital/dashboard");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8 font-sarabun">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">ลงทะเบียนสมาชิกใหม่</h1>
            <p className="text-emerald-100">เพิ่มข้อมูลผู้ป่วยหรือเจ้าหน้าที่ในระบบ</p>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100">
          
          {/* Role Selection Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8 w-full max-w-md mx-auto">
            <button
              onClick={() => setRole("patient")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold ${
                role === "patient" 
                  ? "bg-white text-emerald-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User className="w-5 h-5" />
              ผู้ป่วย (Patient)
            </button>
            <button
              onClick={() => setRole("hospital")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold ${
                role === "hospital" 
                  ? "bg-white text-teal-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              เจ้าหน้าที่ (Staff)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ชื่อจริง</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    name="firstName"
                    required
                    placeholder="เช่น สมชาย" 
                    className="pl-10 h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">นามสกุล</label>
                <Input 
                  name="lastName"
                  required
                  placeholder="เช่น ใจดี" 
                  className="h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {role === "patient" ? "หมายเลขบัตรประชาชน / HN" : "รหัสเจ้าหน้าที่"}
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  name="hospitalId"
                  required
                  placeholder={role === "patient" ? "กรอกเลข HN" : "กรอกรหัสพนักงาน"} 
                  className="pl-10 h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  value={formData.hospitalId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ชื่อผู้ใช้งาน (Username)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  name="username"
                  required
                  placeholder="สำหรับเข้าสู่ระบบ" 
                  className="pl-10 h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">รหัสผ่าน</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    name="password"
                    type="password"
                    required
                    placeholder="ตั้งรหัสผ่าน" 
                    className="pl-10 h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ยืนยันรหัสผ่าน</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="ยืนยันรหัสผ่านอีกครั้ง" 
                    className="pl-10 h-12 text-base bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className={`w-full h-14 text-lg font-bold shadow-lg transition-all hover:scale-[1.02] ${
                  role === "patient" 
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" 
                    : "bg-teal-600 hover:bg-teal-700 shadow-teal-200"
                }`}
              >
                <Save className="w-5 h-5 mr-2" />
                ลงทะเบียน{role === "patient" ? "ผู้ป่วย" : "เจ้าหน้าที่"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
