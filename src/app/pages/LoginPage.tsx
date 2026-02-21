import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, Mail, Lock, Sparkles, ArrowLeft, Hospital, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const role = localStorage.getItem("warfarin_role") || "patient";
  const isHospital = role === "hospital";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("warfarin_logged_in", "true");
    
    if (isHospital) {
      navigate("/hospital/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/role-selection")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>เปลี่ยนประเภทผู้ใช้</span>
        </button>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-xl ${
              isHospital 
                ? 'bg-gradient-to-br from-primary to-secondary shadow-primary/20'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20'
            }`}>
              {isHospital ? (
                <Hospital className="w-10 h-10 text-white" />
              ) : (
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              )}
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className={`w-6 h-6 animate-pulse ${isHospital ? 'text-primary' : 'text-emerald-500'}`} fill="currentColor" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Coaguard
          </h1>
          <p className="text-muted-foreground text-lg">
            {isHospital ? 'เข้าสู่ระบบเจ้าหน้าที่' : 'เข้าสู่ระบบผู้ป่วย'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary/10 border border-white p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm">อีเมล</Label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors ${
                  isHospital ? 'group-focus-within:text-primary' : 'group-focus-within:text-emerald-500'
                }`} />
                <Input
                  id="email"
                  type="email"
                  placeholder={isHospital ? "doctor@hospital.com" : "patient@email.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-12 h-14 bg-white border-2 border-gray-100 rounded-xl text-base transition-all ${
                    isHospital ? 'focus:border-primary' : 'focus:border-emerald-500'
                  }`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-sm">รหัสผ่าน</Label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors ${
                  isHospital ? 'group-focus-within:text-primary' : 'group-focus-within:text-emerald-500'
                }`} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-12 h-14 bg-white border-2 border-gray-100 rounded-xl text-base transition-all ${
                    isHospital ? 'focus:border-primary' : 'focus:border-emerald-500'
                  }`}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-14 text-white rounded-xl shadow-lg transition-all hover:shadow-xl font-semibold text-base ${
                isHospital 
                  ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-primary/20 hover:shadow-primary/30'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/20 hover:shadow-emerald-500/30'
              }`}
            >
              เข้าสู่ระบบ
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className={`font-medium transition-colors ${
              isHospital ? 'text-primary hover:text-secondary' : 'text-emerald-600 hover:text-teal-600'
            }`}>
              ลืมรหัสผ่าน?
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground space-y-1">

        </div>
      </div>
    </div>
  );
}