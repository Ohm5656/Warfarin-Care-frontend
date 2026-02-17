import { useState, useMemo } from "react";
import { ArrowLeft, Filter, Calendar, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router";

// Mock history data
const mockHistory = [
  { id: 1, date: "2024-03-14", value: 2.7, status: "safe" },
  { id: 2, date: "2024-03-07", value: 2.4, status: "safe" },
  { id: 3, date: "2024-02-29", value: 2.6, status: "safe" },
  { id: 4, date: "2024-02-22", value: 2.5, status: "safe" },
  { id: 5, date: "2024-02-15", value: 2.8, status: "safe" },
  { id: 6, date: "2024-02-08", value: 2.3, status: "safe" },
  { id: 7, date: "2024-02-01", value: 2.1, status: "safe" },
  { id: 8, date: "2024-01-25", value: 3.2, status: "monitor" },
  { id: 9, date: "2024-01-18", value: 2.9, status: "safe" },
  { id: 10, date: "2024-01-11", value: 1.8, status: "monitor" },
];

function getStatusInfo(status: string) {
  switch (status) {
    case "safe":
      return { 
        label: "ปลอดภัย", 
        color: "#10b981", 
        bgColor: "#d1fae5",
        gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
      };
    case "monitor":
      return { 
        label: "ติดตาม", 
        color: "#f59e0b", 
        bgColor: "#fef3c7",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
      };
    case "danger":
      return { 
        label: "อันตราย", 
        color: "#ef4444", 
        bgColor: "#fee2e2",
        gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)"
      };
    default:
      return { 
        label: "ไม่ทราบ", 
        color: "#6b7280", 
        bgColor: "#f3f4f6",
        gradient: "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)"
      };
  }
}

function formatThaiDate(dateString: string) {
  const date = new Date(dateString);
  const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

export function HistoryPage() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("all");

  const filteredHistory = useMemo(() => {
    if (selectedMonth === "all") {
      return mockHistory;
    }
    return mockHistory.filter(record => {
      const recordMonth = new Date(record.date).getMonth() + 1;
      return recordMonth.toString() === selectedMonth;
    });
  }, [selectedMonth]);

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
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">ประวัติการตรวจ</h1>
              <p className="text-white/80 mt-1">ดูประวัติค่า INR ย้อนหลัง</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto -mt-8 relative z-20">
        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            <label htmlFor="month-filter" className="font-semibold text-foreground">
              กรองตามเดือน:
            </label>
            <select
              id="month-filter"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex-1 md:flex-none px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary bg-white transition-all font-medium"
            >
              <option value="all">ทั้งหมด</option>
              <option value="3">มีนาคม 2567</option>
              <option value="2">กุมภาพันธ์ 2567</option>
              <option value="1">มกราคม 2567</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">จำนวนครั้งทั้งหมด</p>
            </div>
            <p className="text-4xl font-bold text-primary">{filteredHistory.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground">ค่าเฉลี่ย</p>
            </div>
            <p className="text-4xl font-bold text-secondary">
              {(filteredHistory.reduce((acc, r) => acc + r.value, 0) / filteredHistory.length).toFixed(1)}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">ปลอดภัย</p>
            </div>
            <p className="text-4xl font-bold text-emerald-500">
              {filteredHistory.filter(r => r.status === "safe").length}
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((record) => {
            const statusInfo = getStatusInfo(record.status);
            return (
              <div
                key={record.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5 md:p-6 hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: statusInfo.gradient }}></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-medium">{formatThaiDate(record.date)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">ค่า INR</p>
                        <p className="text-4xl md:text-5xl font-bold" style={{ 
                          background: statusInfo.gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {record.value.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-5 py-3 rounded-2xl font-bold text-sm text-white shadow-lg" style={{ background: statusInfo.gradient }}>
                      {statusInfo.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredHistory.length === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 text-center">
            <p className="text-muted-foreground">ไม่พบข้อมูลในช่วงเวลาที่เลือก</p>
          </div>
        )}
      </div>
    </div>
  );
}