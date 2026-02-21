import { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "../components/ui/input";

// Mock Data for Drug/Food Interactions
const safetyData = [
  { id: 1, name: "แปะก๊วย (Ginkgo)", status: "danger", description: "เพิ่มความเสี่ยงเลือดออก ห้ามรับประทานร่วมกับ Warfarin" },
  { id: 2, name: "โสม (Ginseng)", status: "danger", description: "อาจลดประสิทธิภาพของยา หรือเพิ่มความเสี่ยงเลือดออก" },
  { id: 3, name: "กระเทียม (Garlic)", status: "warning", description: "ทานได้ในปริมาณทำอาหารปกติ แต่ไม่ควรทานแบบอัดเม็ดเสริม" },
  { id: 4, name: "ผักใบเขียว (Green Vegetables)", status: "warning", description: "มีวิตามิน K สูง ควรทานในปริมาณที่สม่ำเสมอทุกวัน ไม่ควรเพิ่มหรือลดกะทันหัน" },
  { id: 5, name: "น้ำมันปลา (Fish Oil)", status: "danger", description: "เพิ่มความเสี่ยงเลือดออก ควรปรึกษาแพทย์ก่อนใช้" },
  { id: 6, name: "ขิง (Ginger)", status: "warning", description: "ทานได้ในปริมาณทำอาหารปกติ ระวังการทานแบบเข้มข้นหรือแคปซูล" },
  { id: 7, name: "แอลกอฮอล์ (Alcohol)", status: "danger", description: "มีผลกระทบต่อการทำงานของตับและยาอย่างมาก ควรหลีกเลี่ยง" },
  { id: 8, name: "ชาเขียว (Green Tea)", status: "warning", description: "มีวิตามิน K สูง อาจต้านฤทธิ์ยา หากดื่มควรดื่มปริมาณเท่าเดิมทุกวัน" },
  { id: 9, name: "ข้าวสวย/ข้าวไรซ์เบอร์รี่", status: "safe", description: "สามารถรับประทานได้ตามปกติ" },
  { id: 10, name: "เนื้อปลา/เนื้อไก่", status: "safe", description: "สามารถรับประทานได้ตามปกติ" },
  { id: 11, name: "มะละกอ", status: "safe", description: "สามารถรับประทานได้ตามปกติ" },
  { id: 12, name: "กล้วย", status: "safe", description: "สามารถรับประทานได้ตามปกติ" },
  { id: 13, name: "ยาแก้ปวดพาราเซตามอล", status: "safe", description: "ทานได้ แต่ไม่ควรเกิน 4 เม็ดต่อวัน หากต้องทานติดต่อกันหลายวันควรปรึกษาแพทย์" },
  { id: 14, name: "ยาแก้ปวดแอสไพริน/NSAIDs", status: "danger", description: "กัดกระเพาะและเพิ่มความเสี่ยงเลือดออก ห้ามรับประทานเองเด็ดขาด" },
];

export function SafetyPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = safetyData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "danger": return "bg-red-50 text-red-700 border-red-200";
      case "warning": return "bg-amber-50 text-amber-700 border-amber-200";
      case "safe": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "danger": return <XCircle className="w-6 h-6 text-red-500" />;
      case "warning": return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case "safe": return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      default: return <Info className="w-6 h-6 text-slate-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "danger": return "หลีกเลี่ยง/ห้ามทาน";
      case "warning": return "ระวัง/ปรึกษาแพทย์";
      case "safe": return "ทานได้ปกติ";
      default: return "ไม่ระบุ";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8 font-sarabun">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 md:p-10 text-white rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-8 -translate-x-8"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h1 className="text-3xl font-bold mb-2">กินได้ / กินไม่ได้?</h1>
          <p className="text-blue-100">ตรวจสอบอาหาร ยา และสมุนไพร ที่มีผลกับ Warfarin</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20 space-y-6">
        
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <Input 
            type="text" 
            placeholder="ค้นหาชื่ออาหาร, ยา, สมุนไพร (เช่น แปะก๊วย, ขิง)" 
            className="border-none shadow-none text-lg focus-visible:ring-0 px-0 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-5 rounded-2xl border flex items-start gap-4 shadow-sm transition-all hover:shadow-md ${getStatusColor(item.status)}`}
                >
                  <div className="shrink-0 mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${
                        item.status === 'danger' ? 'bg-red-200 text-red-800' : 
                        item.status === 'warning' ? 'bg-amber-200 text-amber-800' : 
                        'bg-emerald-200 text-emerald-800'
                    }`}>
                        {getStatusLabel(item.status)}
                    </span>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>ไม่พบข้อมูลที่คุณค้นหา</p>
                <p className="text-sm">ลองค้นหาด้วยคำอื่น หรือปรึกษาแพทย์</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mt-8">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
             <Info className="w-5 h-5 text-blue-500" />
             หลักการทานอาหารสำหรับผู้ใช้ Warfarin
           </h3>
           <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5">
             <li>รับประทานผักใบเขียวในปริมาณที่ <strong>สม่ำเสมอ</strong> ทุกวัน ไม่ควรงดหรือทานเพิ่มกะทันหัน</li>
             <li>หลีกเลี่ยงยาสมุนไพร ยาหม้อ ยาลูกกลอน และอาหารเสริมที่ไม่ทราบส่วนประกอบแน่ชัด</li>
             <li>หลีกเลี่ยงแอลกอฮอล์ทุกชนิด</li>
             <li>หากเจ็บป่วย ไม่ควรซื้อยาทานเอง ควรแจ้งแพทย์หรือเภสัชกรทุกครั้งว่าทานยา Warfarin อยู่</li>
           </ul>
        </div>
      </div>
    </div>
  );
}
