import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, AlertCircle, TrendingUp, Users, Filter, Eye, UserPlus } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Mock patient data
const mockPatients = [
  { id: 1, name: "นายสมชาย ใจดี", hn: "HN001234", latestINR: 2.5, status: "safe", lastCheck: "14/03/67" },
  { id: 2, name: "นางสาวมณี สุขใจ", hn: "HN001235", latestINR: 3.4, status: "monitor", lastCheck: "14/03/67" },
  { id: 3, name: "นายวิชัย รักษ์ดี", hn: "HN001236", latestINR: 1.6, status: "monitor", lastCheck: "13/03/67" },
  { id: 4, name: "นางสมศรี แจ่มใส", hn: "HN001237", latestINR: 2.8, status: "safe", lastCheck: "13/03/67" },
  { id: 5, name: "นายประสิทธิ์ มั่นคง", hn: "HN001238", latestINR: 3.8, status: "danger", lastCheck: "12/03/67" },
  { id: 6, name: "นางวิไล สดใส", hn: "HN001239", latestINR: 2.3, status: "safe", lastCheck: "12/03/67" },
  { id: 7, name: "นายสุรชัย ชัยชนะ", hn: "HN001240", latestINR: 2.7, status: "safe", lastCheck: "11/03/67" },
  { id: 8, name: "นางสาวพมพ์ใจ งามสง่า", hn: "HN001241", latestINR: 1.3, status: "danger", lastCheck: "11/03/67" },
];

function getStatusInfo(status: string) {
  switch (status) {
    case "safe":
      return { 
        label: "ปลอดภัย", 
        color: "text-emerald-600", 
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200"
      };
    case "monitor":
      return { 
        label: "ติดตาม", 
        color: "text-amber-600", 
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200"
      };
    case "danger":
      return { 
        label: "อันตราย", 
        color: "text-red-600", 
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    default:
      return { 
        label: "ไม่ทราบ", 
        color: "text-gray-600", 
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200"
      };
  }
}

export function HospitalDashboardPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPatients = useMemo(() => {
    return mockPatients.filter(patient => {
      const matchesSearch = patient.name.includes(searchTerm) || patient.hn.includes(searchTerm);
      const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const totalPatients = mockPatients.length;
  const dangerCount = mockPatients.filter(p => p.status === "danger").length;
  const monitorCount = mockPatients.filter(p => p.status === "monitor").length;
  const safeCount = mockPatients.filter(p => p.status === "safe").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary text-white p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">แดชบอร์ดเจ้าหน้าที่</h1>
              <p className="text-white/80">จัดการและติดตามผู้ป่วย Warfarin</p>
            </div>
            <Button 
              onClick={() => navigate("/hospital/register")}
              className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg font-bold gap-2"
            >
              <UserPlus className="w-5 h-5" />
              ลงทะเบียนสมาชิกใหม่
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto -mt-8 relative z-20 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">ผู้ป่วยทั้งหมด</p>
            </div>
            <p className="text-4xl font-bold text-primary">{totalPatients}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-sm text-muted-foreground">ต้องเร่งดูแล</p>
            </div>
            <p className="text-4xl font-bold text-red-500">{dangerCount}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-sm text-muted-foreground">ติดตามใกล้ชิด</p>
            </div>
            <p className="text-4xl font-bold text-amber-500">{monitorCount}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">สถานะปกติ</p>
            </div>
            <p className="text-4xl font-bold text-emerald-500">{safeCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ค้นหาด้วยชื่อหรือ HN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white border-2 border-gray-100 focus:border-primary rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 h-12 rounded-xl border-2 border-gray-100 focus:border-primary bg-white transition-all font-medium"
              >
                <option value="all">สถานะทั้งหมด</option>
                <option value="danger">อันตราย</option>
                <option value="monitor">ติดตาม</option>
                <option value="safe">ปลอดภัย</option>
              </select>
            </div>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-muted/50 to-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ชื่อ-นามสกุล</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">HN</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ค่า INR ล่าสุด</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">สถานะ</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ตรวจล่าสุด</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => {
                  const statusInfo = getStatusInfo(patient.status);
                  return (
                    <tr key={patient.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium">{patient.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground font-mono">{patient.hn}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">{patient.latestINR}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor} border`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{patient.lastCheck}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/hospital/patient/${patient.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          <span>ดูรายละเอียด</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              ไม่พบข้อมูลผู้ป่วยที่ตรงกับการค้นหา
            </div>
          )}
        </div>
      </div>
    </div>
  );
}