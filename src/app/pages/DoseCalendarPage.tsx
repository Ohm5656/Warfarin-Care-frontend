import { useState, useMemo } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Check, X, Pill } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

// Mock dose data - using February 2026 dates
const mockDoseSchedule = [
  { date: "2026-02-01", dose: "5mg", taken: true },
  { date: "2026-02-02", dose: "5mg", taken: true },
  { date: "2026-02-03", dose: "5mg", taken: true },
  { date: "2026-02-04", dose: "5mg", taken: true },
  { date: "2026-02-05", dose: "5mg", taken: false },
  { date: "2026-02-06", dose: "5mg", taken: true },
  { date: "2026-02-07", dose: "5mg", taken: true },
  { date: "2026-02-08", dose: "5mg", taken: true },
  { date: "2026-02-09", dose: "5mg", taken: true },
  { date: "2026-02-10", dose: "5mg", taken: true },
  { date: "2026-02-11", dose: "5mg", taken: true },
  { date: "2026-02-12", dose: "5mg", taken: true },
  { date: "2026-02-13", dose: "5mg", taken: true },
  { date: "2026-02-14", dose: "5mg", taken: true },
  { date: "2026-02-15", dose: "5mg", taken: true },
  { date: "2026-02-16", dose: "5mg", taken: false }, // Today - not taken yet
  { date: "2026-02-17", dose: "5mg", taken: false }, // Future
  { date: "2026-02-18", dose: "5mg", taken: false }, // Future
];

function formatThaiDate(dateString: string) {
  const date = new Date(dateString);
  const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  return `${day} ${month}`;
}

function getDayName(dateString: string) {
  const date = new Date(dateString);
  const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  return days[date.getDay()];
}

export function DoseCalendarPage() {
  const navigate = useNavigate();
  const [doses, setDoses] = useState(mockDoseSchedule);

  // Sort doses by date descending (newest first)
  const sortedDoses = useMemo(() => {
    return [...doses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [doses]);

  const handleConfirmDose = (date: string) => {
    setDoses(doses.map(d => 
      d.date === date ? { ...d, taken: !d.taken } : d
    ));
  };

  const today = new Date().toISOString().split("T")[0];
  const takenCount = doses.filter(d => d.taken).length;
  const missedCount = doses.filter(d => !d.taken && new Date(d.date) < new Date(today)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-muted/30 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white p-6 md:p-10 relative overflow-hidden">
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
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">ตารางยา Warfarin</h1>
              <p className="text-white/80 mt-1">ยืนยันการรับประทานยารายวัน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto -mt-8 relative z-20 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">รับประทานแล้ว</p>
            </div>
            <p className="text-4xl font-bold text-emerald-500">{takenCount}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-sm text-muted-foreground">พลาด</p>
            </div>
            <p className="text-4xl font-bold text-red-500">{missedCount}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">ขนาดยาปัจจุบัน</p>
            </div>
            <p className="text-4xl font-bold text-primary">5 mg</p>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">ประวัติการรับประทานยา</h2>
            </div>
          </div>

          <div className="space-y-3">
            {sortedDoses.map((dose) => {
              const isToday = dose.date === today;
              const isMissed = !dose.taken && new Date(dose.date) < new Date(today);
              const isFuture = new Date(dose.date) > new Date(today);

              return (
                <div
                  key={dose.date}
                  className={`relative rounded-2xl p-5 transition-all ${
                    isToday
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-lg"
                      : isMissed
                      ? "bg-red-50 border-2 border-red-200"
                      : dose.taken
                      ? "bg-emerald-50/50 border border-emerald-100"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  {isToday && (
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      วันนี้
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-bold ${
                        isToday
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                          : isMissed
                          ? "bg-red-100 text-red-600"
                          : dose.taken
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <span className="text-xs">{getDayName(dose.date)}</span>
                        <span className="text-xl">{new Date(dose.date).getDate()}</span>
                      </div>
                      
                      <div>
                        <p className="font-bold text-lg mb-1">{formatThaiDate(dose.date)}</p>
                        <p className="text-sm text-muted-foreground">ขนาด: {dose.dose}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {!isFuture && (
                        <>
                          {dose.taken ? (
                            <div className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                              <Check className="w-6 h-6" />
                              <span className="text-base">รับประทานแล้ว</span>
                            </div>
                          ) : isMissed ? (
                            <div className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                              <X className="w-6 h-6" />
                              <span className="text-base">พลาด</span>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleConfirmDose(dose.date)}
                              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl h-14 px-8 text-base font-bold shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:scale-105 transition-all"
                            >
                              <Check className="w-5 h-5 mr-2" />
                              ยืนยันรับประทานยา
                            </Button>
                          )}
                        </>
                      )}
                      {isFuture && (
                        <div className="text-muted-foreground text-sm px-6 py-3 bg-gray-100 rounded-xl font-medium">กำหนดการ</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Information Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </div>
            คำแนะนำสำคัญ
          </h3>
          <ul className="space-y-3 text-sm text-amber-900">
            <li className="flex gap-3 items-start">
              <span className="text-amber-600 text-lg">•</span>
              <span>รับประทานยา Warfarin ในเวลาเดิมทุกวัน (แนะนำ เวลา 18:00-20:00 น.)</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-600 text-lg">•</span>
              <span>หากลืมรับประทานยา ให้รับประทานทันทีที่นึกได้ แต่ถ้าใกล้เวลาครั้งถัดไป ไม่ต้องเพิ่มขนาด</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-600 text-lg">•</span>
              <span>อย่าปรับขนาดยาด้วยตนเอง ต้องปรึกษาแพทย์เสมอ</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-600 text-lg">•</span>
              <span>กดยืนยันการรับประทานยาทุกครั้งเพื่อความถูกต้องของข้อมูล</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}