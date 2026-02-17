import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, TrendingUp, Save, Bell, Activity, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";

// Mock data
const mockINRHistory = [
  { date: "01/03", value: 2.1 },
  { date: "04/03", value: 2.3 },
  { date: "07/03", value: 2.8 },
  { date: "10/03", value: 2.5 },
  { date: "13/03", value: 2.7 },
];

function getINRStatus(value: number) {
  if (value >= 2.0 && value <= 3.0) {
    return {
      status: "ปลอดภัย",
      color: "#10b981",
      bgColor: "#d1fae5",
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      textColor: "text-emerald-600"
    };
  } else if ((value > 3.0 && value <= 3.5) || (value >= 1.5 && value < 2.0)) {
    return {
      status: "ติดตาม",
      color: "#f59e0b",
      bgColor: "#fef3c7",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
      textColor: "text-amber-600"
    };
  } else {
    return {
      status: "อันตราย",
      color: "#ef4444",
      bgColor: "#fee2e2",
      gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
      textColor: "text-red-600"
    };
  }
}

export function PatientDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [newINR, setNewINR] = useState("");
  const [dosage, setDosage] = useState("5");
  const [nextAppointment, setNextAppointment] = useState("");
  const [notes, setNotes] = useState("");

  const latestINR = 2.7;
  const inrStatus = getINRStatus(latestINR);

  const handleSaveAndNotify = () => {
    alert("บันทึกข้อมูลและส่งการแจ้งเตือนถึงผู้ป่วยเรียบร้อยแล้ว");
    navigate("/hospital/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary text-white p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/hospital/dashboard")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>กลับรายชื่อผู้ป่วย</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">นายสมชาย ใจดี</h1>
            <p className="text-white/80">HN: HN001234 | อายุ: 65 ปี</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-6xl mx-auto -mt-8 relative z-20 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - INR Status and Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* INR Status Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: inrStatus.gradient }}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: inrStatus.gradient }}>
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-muted-foreground mb-1">ค่า INR ปัจจุบัน</h2>
                    <span
                      className="inline-block px-5 py-2 rounded-full font-bold text-white shadow-lg text-sm"
                      style={{ background: inrStatus.gradient }}
                    >
                      {inrStatus.status}
                    </span>
                  </div>
                </div>

                <div className="text-center py-8 mb-6">
                  <p className="text-7xl font-bold tracking-tight" style={{ 
                    background: inrStatus.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {latestINR.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">อัพเดต: 14 มีนาคม 2567 09:30</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">ช่วงปลอดภัย</p>
                    <p className="text-2xl font-bold text-primary">2.0 – 3.0</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">ขนาดยาปัจจุบัน</p>
                    <p className="text-2xl font-bold text-foreground">5 mg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* INR Trend Chart */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">แนวโน้มค่า INR</h2>
                  <p className="text-sm text-muted-foreground">2 สัปดาห์ล่าสุด</p>
                </div>
              </div>
              
              <div className="h-64 min-h-[256px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockINRHistory}>
                    <defs>
                      <linearGradient id="colorINR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F6B3A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0F6B3A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis domain={[0, 4]} stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        padding: "12px"
                      }}
                    />
                    <ReferenceLine y={2.0} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
                    <ReferenceLine y={3.0} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0F6B3A"
                      strokeWidth={3}
                      fill="url(#colorINR)"
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0F6B3A"
                      strokeWidth={4}
                      dot={{ fill: "#0F6B3A", r: 6, strokeWidth: 3, stroke: "white" }}
                      activeDot={{ r: 8, strokeWidth: 3, stroke: "white" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Clinical Intelligence Indicator */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">ข้อมูลเชิงคลินิก</p>
                    <p className="text-sm text-blue-700">
                      แนวโน้มค่า INR มีเสถียรภาพดี อยู่ในช่วงเป้าหมาย ควรคงขนาดยาเดิม
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Adjustment Form */}
          <div className="space-y-6">
            {/* Add New INR */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold mb-4">บันทึกค่า INR ใหม่</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-inr" className="text-sm">ค่า INR</Label>
                  <Input
                    id="new-inr"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={newINR}
                    onChange={(e) => setNewINR(e.target.value)}
                    className="h-12 text-lg font-bold text-center bg-white border-2 border-gray-100 focus:border-primary rounded-xl mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Dose Adjustment */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold mb-4">ปรับขนาดยา Warfarin</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dosage" className="text-sm">ขนาดยา (mg)</Label>
                  <Input
                    id="dosage"
                    type="number"
                    step="0.5"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="h-12 text-lg font-bold text-center bg-white border-2 border-gray-100 focus:border-primary rounded-xl mt-2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["2.5", "5", "7.5"].map((dose) => (
                    <button
                      key={dose}
                      onClick={() => setDosage(dose)}
                      className={`py-2 rounded-lg border-2 font-semibold transition-all ${
                        dosage === dose
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-muted-foreground border-gray-200 hover:border-primary'
                      }`}
                    >
                      {dose}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Appointment */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                กำหนดนัดหมาย
              </h3>
              <Input
                type="date"
                value={nextAppointment}
                onChange={(e) => setNextAppointment(e.target.value)}
                className="h-12 bg-white border-2 border-gray-100 focus:border-primary rounded-xl"
              />
            </div>

            {/* Notes */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold mb-4">หมายเหตุ</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="บันทึกข้อมูลเพิ่มเติม..."
                className="w-full h-24 p-3 bg-white border-2 border-gray-100 focus:border-primary rounded-xl resize-none"
              />
            </div>

            {/* Save and Notify Button */}
            <Button
              onClick={handleSaveAndNotify}
              className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl text-lg shadow-xl shadow-primary/20"
            >
              <Save className="w-5 h-5 mr-2" />
              บันทึกและแจ้งผู้ป่วย
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 rounded-xl"
            >
              <Bell className="w-4 h-4 mr-2" />
              ส่งการแจ้งเตือนพิเศษ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}