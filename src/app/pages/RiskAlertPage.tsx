import { ArrowLeft, Phone, AlertTriangle, FileText, Activity, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export function RiskAlertPage() {
  const navigate = useNavigate();

  // Mock data - in real app, would check current INR status
  const isHighRisk = false; // Set to true to show warning
  const latestINR = 2.7;

  const handleCallHospital = () => {
    window.location.href = "tel:1669";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-muted/30 pb-24 md:pb-8">
      {/* Header */}
      <div className={`text-white p-6 md:p-10 relative overflow-hidden ${
        isHighRisk 
          ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700' 
          : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/patient/dashboard")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>กลับ</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              {isHighRisk ? (
                <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {isHighRisk ? "แจ้งเตือนความเสี่ยง" : "ข้อมูลสุขภาพ"}
              </h1>
              <p className="text-white/80 mt-1">ติดตามและจัดการความเสี่ยง</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto -mt-8 relative z-20 space-y-6">
        {/* High Risk Warning Card */}
        {isHighRisk && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-red-500 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <AlertTriangle className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-red-600 mb-2">
                    ค่า INR สูงเกินเกณฑ์
                  </h2>
                  <p className="text-muted-foreground">
                    ค่า INR ของคุณอยู่นอกเกณฑ์ปกติ กรุณาติดต่อโรงพยาบาลหรือแพทย์ผู้ดูแลโดยเร็ว
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 mb-4">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">ค่า INR ล่าสุด</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  {latestINR}
                </p>
              </div>

              <Button
                onClick={handleCallHospital}
                className="w-full h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl text-lg shadow-xl shadow-red-500/20 transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                โทรติดต่อโรงพยาบาล (1669)
              </Button>
            </div>
          </div>
        )}

        {/* Normal Status Card */}
        {!isHighRisk && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-600">สุขภาพดี</h2>
                  <p className="text-muted-foreground">ค่า INR อยู่ในเกณฑ์ปกติ</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">ค่า INR ล่าสุด</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                  {latestINR}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Guide Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">คำแนะนำฉุกเฉิน</h3>
          </div>
          
          <div className="space-y-5">
            <div className="border-l-4 border-red-500 pl-5 py-3 bg-red-50/50 rounded-r-xl">
              <h4 className="font-bold text-red-600 mb-3 text-lg">เมื่อค่า INR สูงเกินไป (&gt; 3.5)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>ติดต่อแพทย์หรือโรงพยาบาลทันที</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>หลีกเลี่ยงกิจกรรมที่อาจทำให้เกิดบาดแผล</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>สังเกตอาการเลือดออกผิดปกติ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>อาจต้องปรับลดขนาดยา Warfarin</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-amber-500 pl-5 py-3 bg-amber-50/50 rounded-r-xl">
              <h4 className="font-bold text-amber-600 mb-3 text-lg">เมื่อค่า INR ต่ำเกินไป (&lt; 1.5)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>ติดต่อแพทย์เพื่อปรับขนาดยา</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>เสี่ยงต่อการเกิดลิ่มเลือด</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>ต้องเพิ่มขนาดยา Warfarin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>ตรวจสอบการรับประทานยาและอาหาร</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6">ติดต่อฉุกเฉิน</h3>
          <div className="space-y-4">
            <button
              onClick={handleCallHospital}
              className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-primary bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">ศูนย์รับแจ้งเหตุฉุกเฉิน</p>
                  <p className="text-sm text-muted-foreground">สายด่วน 24 ชั่วโมง</p>
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">1669</span>
            </button>

            <button
              onClick={() => window.location.href = "tel:021234567"}
              className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-secondary bg-gradient-to-r from-secondary/5 to-primary/5 hover:from-secondary/10 hover:to-primary/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">โรงพยาบาลของคุณ</p>
                  <p className="text-sm text-muted-foreground">แผนกผู้ป่วยนอก</p>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">02-123-4567</span>
            </button>
          </div>
        </div>

        {/* Warning Signs */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-red-600 mb-5 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            อาการเตือนที่ต้องพบแพทย์ทันที
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "เลือดกำเดาไหล ไม่หยุด",
              "ปัสสาวะหรืออุจจาระเป็นเลือด",
              "มีรอยช้ำผิดปกติ",
              "ปวดหัว เวียนศีรษะรุนแรง",
              "ปวดท้องรุนแรง",
              "หายใจลำบาก เจ็บหน้าอก"
            ].map((symptom, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/70 rounded-xl p-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}