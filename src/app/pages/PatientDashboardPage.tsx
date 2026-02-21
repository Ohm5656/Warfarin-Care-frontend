import { useState, useEffect } from "react";
import { Calendar, TrendingUp, AlertCircle, Check, Info, ChevronRight, Droplets, Shield, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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
const nextAppointment = "25 มีนาคม 2569"; // Using user's current date 2026, next appointment in 2026. Wait, user said today is Feb 21, 2026. So next appointment should be soon.

function getINRStatus(value: number) {
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
  const [taken, setTaken] = useState(false);
  
  // Reset taken status if it's a new day (mock logic)
  useEffect(() => {
    const lastTakenDate = localStorage.getItem("medication_taken_date");
    const today = new Date().toDateString();
    if (lastTakenDate === today) {
      setTaken(true);
    } else {
      setTaken(false);
    }
  }, []);

  const handleTakeMedication = () => {
    setTaken(true);
    localStorage.setItem("medication_taken_date", new Date().toDateString());
  };

  const todayDate = new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8 font-sarabun">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#0F6B3A] to-[#1E8449] text-white p-6 md:p-10 pb-20 md:pb-24 relative overflow-hidden rounded-b-[40px] shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="relative z-10 max-w-5xl mx-auto flex justify-between items-start">
          <div>
            <p className="text-emerald-100 mb-1">ยินดีต้อนรับ</p>
            <h1 className="text-3xl font-bold">คุณสมชาย ใจดี</h1>
          </div>
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-16 md:-mt-20 relative z-20 space-y-6">
        
        {/* Quick Actions & Info Grid - Medication card removed, moved to DoseCalendarPage */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Next Appointment Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
             <div>
                <div className="flex items-center gap-2 mb-2 text-orange-500">
                   <Clock className="w-5 h-5" />
                   <span className="font-semibold text-sm">นัดหมายถัดไป</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">25 มีนาคม 2569</h3>
                <p className="text-sm text-gray-500">เจาะเลือด INR (08:00 - 10:00)</p>
             </div>
             <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <ChevronRight className="w-6 h-6 text-orange-500" />
             </div>
          </div>

          {/* Education / Safety Link */}
          <div 
             onClick={() => navigate('/patient/safety')}
             className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all"
          >
             <div>
                <div className="flex items-center gap-2 mb-2 text-blue-500">
                   <Info className="w-5 h-5" />
                   <span className="font-semibold text-sm">กินได้ / กินไม่ได้?</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">ตรวจสอบอาหาร</h3>
                <p className="text-sm text-gray-500">ค้นหาข้อมูลยาตีกันและสมุนไพร</p>
             </div>
             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <ChevronRight className="w-6 h-6 text-blue-500" />
             </div>
          </div>
        </div>

        {/* Recent INR Chart (Collapsed/Simplified) */}
        <div className="h-120 bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
           <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">แนวโน้มค่า INR</h2>
                <div className="flex items-center gap-2">
                   <span className={`text-sm font-bold ${latestINR >= 2.0 && latestINR <= 3.0 ? 'text-emerald-600' : 'text-red-500'}`}>
                     ล่าสุด: {latestINR.toFixed(1)}
                   </span>
                   <span className="text-xs text-gray-400">({inrStatus.status})</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockINRData}>
                <defs>
                  <linearGradient id="colorINR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 4]} hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    padding: "12px"
                  }}
                />
                <ReferenceLine y={2.0} stroke="#10b981" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'Min (2.0)', fill: '#10b981', fontSize: 10, position: 'insideLeft' }} />
                <ReferenceLine y={3.0} stroke="#10b981" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'Max (3.0)', fill: '#10b981', fontSize: 10, position: 'insideLeft' }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorINR)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}