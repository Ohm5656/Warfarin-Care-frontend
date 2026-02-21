import { Phone, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 group transition-all"
      >
        <AlertTriangle className="w-6 h-6 animate-pulse" />
        <span className="hidden group-hover:block font-bold pr-2">แจ้งเหตุฉุกเฉิน</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="bg-red-600 p-6 text-white text-center relative">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">แจ้งเหตุฉุกเฉิน</h2>
                <p className="text-red-100">เลือดออกผิดปกติ หรือ อาการแทรกซ้อน</p>
              </div>
              
              <div className="p-6 space-y-4">
                <Button 
                  className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 text-white gap-3 rounded-xl shadow-lg shadow-red-100"
                  onClick={() => window.location.href = "tel:1669"}
                >
                  <Phone className="w-6 h-6" />
                  โทรเรียกรถพยาบาล (1669)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full h-14 text-lg border-2 border-red-100 text-red-600 hover:bg-red-50 gap-3 rounded-xl"
                  onClick={() => {
                    // Navigate to chat or contact nurse
                    console.log("Contact nurse");
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xs font-bold">P</span>
                  </div>
                  ติดต่อพยาบาลผู้ดูแล
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  *กดปุ่มสีแดงหากมีอาการวิกฤตที่ต้องการความช่วยเหลือเร่งด่วน
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
