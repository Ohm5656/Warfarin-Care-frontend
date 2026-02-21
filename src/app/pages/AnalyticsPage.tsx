import { memo } from "react";
import { ArrowLeft, TrendingUp, Users, Activity, PieChart as PieChartIcon, Award } from "lucide-react";
import { useNavigate } from "react-router";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock analytics data
const monthlyINRData = [
  { month: "ต.ค.", safeRange: 75, outOfRange: 25 },
  { month: "พ.ย.", safeRange: 78, outOfRange: 22 },
  { month: "ธ.ค.", safeRange: 82, outOfRange: 18 },
  { month: "ม.ค.", safeRange: 80, outOfRange: 20 },
  { month: "ก.พ.", safeRange: 85, outOfRange: 15 },
  { month: "มี.ค.", safeRange: 87, outOfRange: 13 },
];

const riskDistribution = [
  { name: "ปลอดภัย", value: 65, color: "#10b981" },
  { name: "ติดตาม", value: 25, color: "#f59e0b" },
  { name: "อันตราย", value: 10, color: "#ef4444" },
];

const ttrData = [
  { name: "ในช่วง", value: 82, color: "#10b981" },
  { name: "นอกช่วง", value: 18, color: "#ef4444" },
];

export function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary text-white p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/hospital/dashboard")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>กลับ</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">วิเคราะห์ข้อมูล</h1>
              <p className="text-white/80 mt-1">สถิติและแนวโน้มผู้ป่วย Warfarin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto -mt-8 relative z-20 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">ผู้ป่วยทั้งหมด</p>
            </div>
            <p className="text-4xl font-bold text-primary mb-1">248</p>
            <p className="text-xs text-emerald-600 font-semibold">↑ 12% จากเดือนที่แล้ว</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">TTR เฉลี่ย</p>
            </div>
            <p className="text-4xl font-bold text-emerald-500 mb-1">82%</p>
            <p className="text-xs text-emerald-600 font-semibold">↑ 5% จากเดือนที่แล้ว</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-sm text-muted-foreground">อัตราการติดตาม</p>
            </div>
            <p className="text-4xl font-bold text-amber-500 mb-1">95%</p>
            <p className="text-xs text-emerald-600 font-semibold">↑ 3% จากเดือนที่แล้ว</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-sm text-muted-foreground">เหตุการณ์ไม่พึงประสงค์</p>
            </div>
            <p className="text-4xl font-bold text-red-500 mb-1">3</p>
            <p className="text-xs text-emerald-600 font-semibold">↓ 40% จากเดือนที่แล้ว</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">แนวโน้มรายเดือน</h2>
                <p className="text-sm text-muted-foreground">ผู้ป่วยในช่วงปลอดภัย vs นอกช่วง</p>
              </div>
            </div>
            
            <div className="h-80 min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyINRData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      padding: "12px"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="safeRange" fill="#10b981" radius={[8, 8, 0, 0]} name="ในช่วงปลอดภัย" />
                  <Bar dataKey="outOfRange" fill="#ef4444" radius={[8, 8, 0, 0]} name="นอกช่วง" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PieChartIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">การกระจายความเสี่ยง</h2>
                <p className="text-sm text-muted-foreground">สัดส่วนผู้ป่วยตามสถานะ</p>
              </div>
            </div>
            
            <div className="h-80 min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      padding: "12px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-lg">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TTR Analysis */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Time in Therapeutic Range (TTR)</h2>
              <p className="text-sm text-muted-foreground">เปอร์เซ็นต์เวลาที่อยู่ในช่วงบำบัด</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 min-h-[256px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ttrData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {ttrData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <p className="text-sm text-muted-foreground mb-2">TTR เป้าหมาย</p>
                <p className="text-4xl font-bold text-emerald-600 mb-2">&gt; 70%</p>
                <p className="text-sm text-emerald-700">มาตรฐานสากล</p>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">TTR ปัจจุบัน</p>
                <p className="text-4xl font-bold text-primary mb-2">82%</p>
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>ดีเยี่ยม!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">💡 ข้อมูลเชิงคลินิก</p>
            <p className="text-sm text-blue-700">
              TTR 82% อยู่ในระดับดีมาก แสดงถึงการควบคุมขนาดยา Warfarin ที่มีประสิทธิภาพ 
              ลดความเสี่ยงเหตุการณ์ไม่พึงประสงค์และภาวะแทรกซ้อน
            </p>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/20 p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6">ผลงานเด่นประจำเดือน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-bold mb-2">อัตราการติดตามเพิ่มขึ้น</h4>
              <p className="text-sm text-muted-foreground">ผู้ป่วยมาตรวจตามนัดเพิ่มขึ้น 95% จากเดิม 92%</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">TTR ปรับตัวดีขึ้น</h4>
              <p className="text-sm text-muted-foreground">เพิ่มขึ้นจาก 77% เป็น 82% ในเดือนนี้</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-bold mb-2">เหตุการณ์ไม่พึงประสงค์ลดลง</h4>
              <p className="text-sm text-muted-foreground">ลดลง 40% เมื่อเทียบกับเดือนก่อน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}