import { useState, useMemo } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Activity, CheckCircle2, AlertCircle, AlertTriangle, Pill, FileText, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday
} from "date-fns";
import { th } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";

// Extended Mock Data Structure
interface DailyLog {
  date: string;
  inr?: {
    value: number;
    status: "safe" | "monitor" | "danger";
    note?: string;
  };
  medication?: {
    status: "taken" | "missed" | "pending";
    dose: string; // e.g., "3 mg (1 tablet)"
    time?: string;
    note?: string;
  };
  appointment?: {
    time: string;
    type: string;
    location: string;
    note?: string;
  };
  doctorNote?: string;
}

// Mock Data Generation
const generateMockData = (): DailyLog[] => {
  return [
    {
      date: "2026-02-14",
      inr: { value: 2.7, status: "safe", note: "คุมอาหารได้ดี" },
      medication: { status: "taken", dose: "3 mg", time: "20:00" },
      doctorNote: "ผลเลือดดีมาก ให้ทานยาขนาดเดิมต่อไป"
    },
    {
      date: "2026-02-13",
      medication: { status: "taken", dose: "3 mg", time: "20:05" }
    },
    {
      date: "2026-02-12",
      medication: { status: "taken", dose: "3 mg", time: "19:55" }
    },
    {
      date: "2026-02-11",
      medication: { status: "taken", dose: "3 mg", time: "20:00" }
    },
    {
      date: "2026-02-10",
      inr: { value: 1.8, status: "monitor", note: "ต่ำกว่าเกณฑ์เล็กน้อย" },
      medication: { status: "missed", dose: "3 mg", note: "ลืมทานยาเนื่องจากติดธุระ" },
      doctorNote: "ระวังเรื่องการลืมทานยา อาจทำให้ค่า INR ตกได้"
    },
    {
      date: "2026-02-21",
      appointment: { time: "09:00", type: "checkup", location: "คลินิกวาร์ฟาริน ชั้น 2", note: "เจาะเลือดปลายนิ้ว และพบแพทย์" },
      medication: { status: "pending", dose: "3 mg" } // Future date
    },
    {
      date: "2026-02-18", // Today
      medication: { status: "pending", dose: "3 mg" },
      doctorNote: "วันนี้งดทานผักใบเขียวจัด"
    },
    {
      date: "2026-02-07",
      inr: { value: 2.4, status: "safe", note: "ปกติ" },
      medication: { status: "taken", dose: "3 mg", time: "20:10" }
    }
  ];
};

const mockData = generateMockData();

function getStatusInfo(status: string) {
  switch (status) {
    case "safe":
      return { 
        label: "ปลอดภัย", 
        color: "#10b981", 
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-700",
        icon: CheckCircle2,
      };
    case "monitor":
      return { 
        label: "ติดตาม", 
        color: "#f59e0b", 
        bgColor: "bg-amber-100",
        textColor: "text-amber-700",
        icon: AlertTriangle,
      };
    case "danger":
      return { 
        label: "อันตราย", 
        color: "#ef4444", 
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        icon: AlertCircle,
      };
    default:
      return { 
        label: "-", 
        color: "#6b7280", 
        bgColor: "bg-gray-100",
        textColor: "text-gray-700",
        icon: Activity,
      };
  }
}

function formatThaiDate(date: Date) {
  return format(date, "d MMMM yyyy", { locale: th });
}

export function HistoryPage() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }); // Sunday start
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Get events for a specific date
  const getDataForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockData.find(d => d.date === dateStr);
  };

  const selectedData = getDataForDate(selectedDate);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="min-h-screen bg-[#E8F5EC] pb-24 md:pb-8 font-sans">
      {/* Header */}
      <div className="bg-[#0F6B3A] text-white p-6 pt-8 pb-12 relative overflow-hidden rounded-b-[2.5rem] shadow-xl z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/patient/dashboard")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-sm font-medium active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">ปฏิทินสุขภาพ</h1>
            <p className="text-emerald-100 text-sm md:text-base opacity-90 font-light">ติดตามประวัติผลเลือดและนัดหมายของคุณ</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-10 relative z-20 space-y-6">
        
        {/* Calendar Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-xl border border-white/50 overflow-hidden backdrop-blur-sm"
        >
          {/* Calendar Header */}
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-[#0F6B3A] ml-2">
              {format(currentMonth, "MMMM yyyy", { locale: th })}
            </h2>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-2 hover:bg-[#E8F5EC] rounded-full transition-colors text-[#0F6B3A]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => {
                const today = new Date();
                setCurrentMonth(today);
                setSelectedDate(today);
              }} className="px-3 py-1 text-xs font-medium bg-[#E8F5EC] text-[#0F6B3A] rounded-full hover:bg-[#d1eadd] transition-colors border border-[#0F6B3A]/20">
                วันนี้
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-[#E8F5EC] rounded-full transition-colors text-[#0F6B3A]">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4 pt-2 bg-white">
            <div className="grid grid-cols-7 mb-2">
              {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, i) => {
                const data = getDataForDate(date);
                const isSelected = isSameDay(date, selectedDate);
                const isCurrentMonth = isSameMonth(date, currentMonth);
                const isTodayDate = isToday(date);
                
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      relative h-10 w-10 mx-auto rounded-full flex items-center justify-center transition-all duration-200
                      ${!isCurrentMonth ? "text-slate-300" : "text-slate-700"}
                      ${isSelected ? "bg-white ring-2 ring-[#0F6B3A] shadow-lg scale-110 z-10 font-bold text-[#0F6B3A]" : "hover:bg-[#E8F5EC]"}
                      ${isTodayDate && !isSelected ? "bg-[#E8F5EC] text-[#0F6B3A] font-semibold" : ""}
                    `}
                  >
                    <span className="text-sm">{format(date, "d")}</span>
                    
                    {/* Indicators */}
                    <div className="absolute bottom-1 flex gap-0.5 justify-center">
                      {data?.inr && (
                        <div 
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: getStatusInfo(data.inr.status).color }}
                        />
                      )}
                      {data?.appointment && (
                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                      )}
                      {data?.medication?.status === 'missed' && (
                         <div className="w-1 h-1 rounded-full bg-red-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Detail Section */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-2">
               <Clock className="w-5 h-5 text-[#0F6B3A]" />
               <h3 className="text-lg font-bold text-[#0F6B3A]">
                 รายละเอียด {formatThaiDate(selectedDate)}
               </h3>
            </div>

            {!selectedData && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center shadow-sm border border-white/50"
               >
                  <div className="w-16 h-16 bg-[#E8F5EC] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0F6B3A]/10">
                    <ClipboardList className="w-8 h-8 text-[#0F6B3A]/40" />
                  </div>
                  <p className="text-slate-500 font-medium">ไม่มีบันทึกข้อมูลสำหรับวันนี้</p>
                  <p className="text-xs text-slate-400 mt-1">ข้อมูลจะปรากฏเมื่อโรงพยาบาลบันทึกเข้าระบบ</p>
               </motion.div>
            )}

            {/* Medication Card */}
            {selectedData?.medication && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-3xl p-5 border relative overflow-hidden shadow-sm transition-all bg-white/90 backdrop-blur-md
                  ${selectedData.medication.status === 'missed' ? 'border-red-100 ring-1 ring-red-100' : 
                    selectedData.medication.status === 'taken' ? 'border-[#0F6B3A]/20 ring-1 ring-[#0F6B3A]/10' : 'border-slate-100'}
                `}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm
                      ${selectedData.medication.status === 'missed' ? 'bg-red-50 text-red-600' : 
                        selectedData.medication.status === 'taken' ? 'bg-[#E8F5EC] text-[#0F6B3A]' : 'bg-slate-50 text-slate-500'}
                    `}>
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">การรับประทานยา</h4>
                      <p className="text-sm text-slate-500">Warfarin {selectedData.medication.dose}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm
                    ${selectedData.medication.status === 'missed' ? 'bg-red-100 text-red-700' : 
                      selectedData.medication.status === 'taken' ? 'bg-[#0F6B3A]/10 text-[#0F6B3A]' : 'bg-slate-100 text-slate-600'}
                  `}>
                    {selectedData.medication.status === 'taken' ? 'รับประทานแล้ว' : 
                     selectedData.medication.status === 'missed' ? 'ลืมรับประทาน' : 'รอรับประทาน'}
                  </div>
                </div>
                
                {selectedData.medication.time && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 pl-1 border-t border-slate-100 pt-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>เวลาที่ทาน: <span className="font-medium text-slate-700">{selectedData.medication.time} น.</span></span>
                  </div>
                )}

                 {selectedData.medication.note && (
                  <div className="mt-3 bg-red-50 p-3 rounded-xl text-sm text-red-700 border border-red-100 flex items-start gap-2">
                     <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                     <p>{selectedData.medication.note}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Lab Result Card */}
            {selectedData?.inr && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden group"
              >
                 <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 transition-colors blur-xl pointer-events-none
                   ${selectedData.inr.status === 'safe' ? 'bg-[#0F6B3A]' : 
                     selectedData.inr.status === 'monitor' ? 'bg-amber-500' : 'bg-red-500'}
                 `}></div>
                 
                 <div className="flex justify-between items-start mb-4 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">ผลการตรวจเลือด</h4>
                        <p className="text-xs text-slate-500">อัปเดตจากห้องปฏิบัติการ</p>
                      </div>
                   </div>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusInfo(selectedData.inr.status).bgColor} ${getStatusInfo(selectedData.inr.status).textColor}`}>
                      {getStatusInfo(selectedData.inr.status).label}
                   </span>
                 </div>

                 <div className="flex items-end gap-3 mb-4 pl-1">
                    <div className="text-5xl font-bold text-slate-800 tracking-tighter">
                      {selectedData.inr.value}
                    </div>
                    <div className="pb-2 text-sm font-medium text-slate-400">ค่า INR</div>
                 </div>

                 {selectedData.inr.note && (
                   <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 border border-slate-100">
                      <span className="font-bold text-slate-700 block mb-1 text-xs uppercase tracking-wider">ผลวินิจฉัย</span>
                      {selectedData.inr.note}
                   </div>
                 )}
              </motion.div>
            )}

            {/* Appointment Card */}
            {selectedData?.appointment && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-5 border border-blue-100/50 shadow-sm relative backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm border border-blue-50">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">นัดหมายแพทย์</h4>
                    <p className="text-xs text-blue-600/80">{selectedData.appointment.type}</p>
                  </div>
                </div>

                <div className="bg-white/60 rounded-2xl p-4 space-y-3 border border-white/60 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-400 font-medium uppercase">เวลา</p>
                      <p className="text-blue-900 font-medium">{selectedData.appointment.time} น.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                     <div>
                      <p className="text-xs text-blue-400 font-medium uppercase">สถานที่</p>
                      <p className="text-blue-900 font-medium">{selectedData.appointment.location}</p>
                    </div>
                  </div>
                </div>

                {selectedData.appointment.note && (
                  <div className="mt-3 text-xs text-blue-600/80 px-2 flex items-start gap-1">
                    <span className="text-blue-400">*</span>
                    {selectedData.appointment.note}
                  </div>
                )}
              </motion.div>
            )}

            {/* Doctor Note (General) */}
            {selectedData?.doctorNote && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-amber-50/80 backdrop-blur-md rounded-3xl p-5 border border-amber-100 shadow-sm"
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-amber-900">คำแนะนำแพทย์</h4>
                 </div>
                 <p className="text-sm text-amber-800 leading-relaxed pl-11">
                   "{selectedData.doctorNote}"
                 </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
