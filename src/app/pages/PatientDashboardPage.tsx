import { useState, useMemo } from "react";
import { Plus, Calendar, TrendingUp, AlertCircle, Activity, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";

// Mock data
const mockINRData = [
  { date: "01/02", value: 2.1 },
  { date: "08/02", value: 2.3 },
  { date: "15/02", value: 2.8 },
  { date: "22/02", value: 2.5 },
  { date: "29/02", value: 2.6 },
  { date: "07/03", value: 2.4 },
  { date: "14/03", value: 2.7 },
];

const latestINR = 2.7;
const nextAppointment = "25 มีนาคม 2567";

function getINRStatus(value: number): { status: string; color: string; bgColor: string; message: string; gradient: string } {
  if (value >= 2.0 && value <= 3.0) {
    return {
      status: "ปลอดภัย",
      color: "#10b981",
      bgColor: "#d1fae5",
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      message: "ค่า INR อยู่ในเกณฑ์ปกติ",
    };
  } else if (value > 3.0 && value <= 3.5) {
    return {
      status: "ติดตาม",
      color: "#f59e0b",
      bgColor: "#fef3c7",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
      message: "ค่า INR สูงกว่าเกณฑ์เล็กน้อย ควรติดตาม",
    };
  } else {
    return {
      status: "อันตราย",
      color: "#ef4444",
      bgColor: "#fee2e2",
      gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
      message: "ค่า INR อยู่นอกเกณฑ์ ติดต่อโรงพยาบาลทันที",
    };
  }
}

export function PatientDashboardPage() {
  const navigate = useNavigate();
  const inrStatus = getINRStatus(latestINR);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-muted/30 pb-24 md:pb-8">
      {/* Modern Header Section with Gradient */}
      <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">สวัสดี คุณสมชาย</h1>
              <p className="text-white/80">ติดตามสุขภาพของคุณทุกวัน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-6xl mx-auto -mt-8 relative z-20 space-y-6">
        {/* INR Status Card - Modern Glass Morphism Style */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: inrStatus.gradient }}></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: inrStatus.gradient }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg text-muted-foreground mb-1">สถานะ INR ล่าสุด</h2>
                  <div className="flex items-center gap-3">
                    <span
                      className="px-5 py-2 rounded-full font-bold text-white shadow-lg"
                      style={{ background: inrStatus.gradient }}
                    >
                      {inrStatus.status}
                    </span>
                  </div>
                </div>
              </div>
              {inrStatus.status === "อันตราย" && (
                <AlertCircle className="w-8 h-8 text-destructive animate-pulse" />
              )}
            </div>

            {/* Large INR Value with Modern Typography */}
            <div className="text-center py-12 my-6">
              <p className="text-muted-foreground mb-3 text-sm uppercase tracking-wider">ค่า INR ปัจจุบัน</p>
              <p className="text-7xl md:text-8xl font-bold tracking-tight mb-2" style={{ 
                background: inrStatus.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {latestINR.toFixed(1)}
              </p>
              <div className="inline-block px-4 py-2 rounded-full bg-muted/50 mt-2">
                <p className="text-sm text-muted-foreground">
                  อัพเดตล่าสุด: วันนี้ 09:30
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">ช่วงปลอดภัย</p>
                </div>
                <p className="text-3xl font-bold text-primary">2.0 – 3.0</p>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 border border-secondary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">นัดหมายครั้งถัดไป</p>
                </div>
                <p className="text-xl font-bold text-foreground">{nextAppointment}</p>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-2xl border-2" style={{ 
              backgroundColor: inrStatus.bgColor,
              borderColor: inrStatus.color + '40'
            }}>
              <p className="text-sm font-medium" style={{ color: inrStatus.color }}>
                💡 {inrStatus.message}
              </p>
            </div>
          </div>
        </div>

        {/* INR Trend Graph - Modern Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">แนวโน้มค่า INR</h2>
                <p className="text-sm text-muted-foreground">7 วันล่าสุด</p>
              </div>
            </div>
          </div>
          
          <div className="h-72 md:h-80 min-h-[288px] md:min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockINRData}>
                <defs>
                  <linearGradient id="colorINR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorINR)"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={4}
                  dot={{ fill: "#10b981", r: 6, strokeWidth: 3, stroke: "white" }}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: "white" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-muted-foreground">ค่า INR ของคุณ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-muted-foreground">ช่วงปลอดภัย (2.0 - 3.0)</span>
            </div>
          </div>
        </div>

        {/* Floating Add Button - Mobile */}
        <button
          onClick={() => navigate("/patient/doses")}
          className="md:hidden fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all hover:scale-110 z-40"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}