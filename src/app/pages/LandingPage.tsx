import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, Shield, LineChart, Bell, Users, Hospital, CheckCircle, ArrowRight, Sparkles, X, Play, User, Activity } from "lucide-react";
import { Button } from "../components/ui/button";

export function LandingPage() {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WafarinCare
              </span>
            </div>
            <Button
              onClick={() => navigate("/role-selection")}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl h-10 px-6"
            >
              เริ่มใช้งาน
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20 pb-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm border border-primary/10">
                <Sparkles className="w-4 h-4 text-primary" fill="currentColor" />
                <span className="text-sm font-medium text-primary">Smart Healthcare Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ลดความเสี่ยงจาก Warfarin<br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ด้วยระบบติดตามอัจฉริยะ
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                แพลตฟอร์มเชื่อมต่อโรงพยาบาลและผู้ป่วย เพื่อจัดการยา Warfarin<br />
                และติดตามค่า INR แบบเรียลไทม์ ลดความผิดพลาดทางยา
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/role-selection")}
                  className="h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl text-lg px-8 shadow-xl shadow-primary/20"
                >
                  เริ่มใช้งานฟรี
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTutorial(true)}
                  className="h-14 border-2 border-primary text-primary hover:bg-primary/5 rounded-xl text-lg px-8"
                >
                  <Play className="w-5 h-5 mr-2" />
                  ดูวิธีใช้งาน
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">สถานะ INR</p>
                      <p className="text-2xl font-bold text-emerald-600">ปลอดภัย</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">ค่า INR</p>
                      <p className="text-3xl font-bold text-primary">2.5</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">ช่วงปลอดภัย</p>
                      <p className="text-xl font-bold text-foreground">2.0-3.0</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-3xl blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ปัญหาที่พบบ่อยในการใช้ Warfarin</h2>
            <p className="text-lg text-muted-foreground">ความท้าทายที่ WafarinCare ช่วยแก้ไข</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bell,
                title: "ค่า INR ผันแปร",
                description: "ผู้ป่วยมักพบปัญหาค่า INR ไม่คงที่ เสี่ยงต่อการเกิดภาวะแทรกซ้อน",
                color: "text-amber-500",
                bg: "bg-amber-50"
              },
              {
                icon: Hospital,
                title: "ความผิดพลาดทางยา",
                description: "การปรับขนาดยาไม่ถูกต้อง หรือผู้ป่วยลืมรับประทานยาตามกำหนด",
                color: "text-red-500",
                bg: "bg-red-50"
              },
              {
                icon: LineChart,
                title: "การติดตามไม่ต่อเนื่อง",
                description: "ขาดระบบติดตามที่เชื่อมต่อระหว่างโรงพยาบาลและผู้ป่วยแบบเรียลไทม์",
                color: "text-blue-500",
                bg: "bg-blue-50"
              }
            ].map((problem, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-primary/20 hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 ${problem.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <problem.icon className={`w-7 h-7 ${problem.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">วิธีการทำงาน</h2>
            <p className="text-lg text-muted-foreground">3 ขั้นตอนสู่การดูแลสุขภาพที่ดีขึ้น</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "เจ้าหน้าที่บันทึกข้อมูล",
                description: "แพทย์/พยาบาลบันทึกค่า INR และปรับขนาดยาผ่านระบบ",
                icon: Users
              },
              {
                step: "02",
                title: "ผู้ป่วยรับการแจ้งเตือน",
                description: "ระบบส่งการแจ้งเตือนและคำแนะนำไปยังผู้ป่วยแบบเรียลไทม์",
                icon: Bell
              },
              {
                step: "03",
                title: "ติดตามและวิเคราะห์",
                description: "Dashboard แสดงแนวโน้มและวิเคราะห์ความเสี่ยงอัตโนมัติ",
                icon: LineChart
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Hospitals / For Patients */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Hospitals */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-10 border border-primary/10">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                <Hospital className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">สำหรับโรงพยาบาล</h3>
              <p className="text-muted-foreground mb-6">
                เพิ่มประสิทธิภาพการจัดการผู้ป่วยที่ใช้ Warfarin
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "จัดการข้อมูลผู้ป่วยทั้งหมดในที่เดียว",
                  "ระบบแจ้งเตือนผู้ป่วยที่มีความเสี่ยง",
                  "Dashboard วิเคราะห์แนวโน้มและสถิติ",
                  "บันทึกการปรับขนาดยาและส่งแจ้งผู้ป่วย",
                  "ระบบ Audit Log สำหรับความปลอดภัย"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/role-selection")}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl"
              >
                เริ่มใช้งานแดชบอร์ด
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* For Patients */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-10 border border-emerald-100">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" fill="currentColor" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">สำหรับผู้ป่วย</h3>
              <p className="text-muted-foreground mb-6">
                ติดตามสุขภาพของคุณได้ทุกที่ทุกเวลา
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "ดูค่า INR ล่าสุดและสถานะความปลอดภัย",
                  "รับการแจ้งเตือนเมื่อค่าผิดปกติ",
                  "ตารางยาและการยืนยันการรับประทาน",
                  "ดูประวัติและแนวโน้มค่า INR",
                  "ติดต่อโรงพยาบาลได้ทันที"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/role-selection")}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
              >
                เข้าสู่ระบบผู้ป่วย
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            เข้าร่วมกับโรงพยาบาลชั้นนำที่ใช้ WafarinCare ในการดูแลผู้ป่วย
          </p>
          <Button
            onClick={() => navigate("/role-selection")}
            className="h-14 bg-white text-primary hover:bg-white/90 rounded-xl text-lg px-8 shadow-xl"
          >
            เริ่มใช้งานฟรีวันนี้
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WafarinCare
              </span>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground mt-1">
                © 2024 WafarinCare. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowTutorial(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-primary to-secondary text-white p-6 md:p-8 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">วิธีใช้งาน WafarinCare</h2>
                    <p className="text-white/80 text-sm mt-1">คู่มือเริ่มต้นสำหรับผู้ใช้งานทุกประเภท</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8">
              {/* For Hospital Staff */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">สำหรับเจ้าหน้าที่โรงพยาบาล</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">เข้าสู่ระบบ</h4>
                        <p className="text-muted-foreground">เลือก "เจ้าหน้าที่โรงพยาบาล" จากหน้าแรก แล้วกรอก Username และ Password ที่ได้รับจากระบบ</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">ดูรายชื่อผู้ป่วย</h4>
                        <p className="text-muted-foreground">Dashboard แสดงผู้ป่วยทั้งหมด พร้อมสถานะความเสี่ยง (ปลอดภัย/ติดตาม/อันตราย) ใช้ช่องค้นหาเพื่อหาผู้ป่วยเฉพาะ</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">บันทึกค่า INR</h4>
                        <p className="text-muted-foreground">คลิกที่ผู้ป่วย → กรอกค่า INR ใหม่ → ระบบจะวิเคราะห์และแนะนำการปรับขนาดยาอัตโนมัติ</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">ติดตามสถิติ</h4>
                        <p className="text-muted-foreground">ไปที่หน้า "สถิติและรายงาน" เพื่อดูแนวโน้ม Time in Therapeutic Range (TTR) และการกระจายความเสี่ยง</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* For Patients */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">สำหรับผู้ป่วย</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">เข้าสู่ระบบ</h4>
                        <p className="text-muted-foreground">เลือก "ผู้ป่วย" จากหน้าแรก แล้วกรอก HN และรหัสผ่านที่โรงพยาบาลให้</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">ดูค่า INR ล่าสุด</h4>
                        <p className="text-muted-foreground">หน้าแรกแสดงค่า INR ปัจจุบัน สถานะ (ปลอดภัย/ติดตาม/อันตราย) และกราฟแนวโน้ม</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">ยืนยันการรับประทานยา</h4>
                        <p className="text-muted-foreground">ไปที่ "ตารางยา" → คลิก "ยืนยันรับประทานยา" ทุกครั้งที่รับประทาน Warfarin เพื่อบันทึกข้อมูล</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">ดูประวัติและการแจ้งเตือน</h4>
                        <p className="text-muted-foreground">หน้า "ประวัติ" แสดงค่า INR ย้อนหลัง หน้า "การแจ้งเตือน" แสดงคำเตือนสำคัญจากโรงพยาบาล</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-amber-900">เคล็ดลับสำคัญ</h4>
                </div>
                <ul className="space-y-3 text-amber-900">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>ผู้ป่วย:</strong> รับประทานยาในเวลาเดิมทุกวัน และยืนยันทุกครั้ง</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>ผู้ป่วย:</strong> ติดตามค่า INR ผ่านแอป ไม่ต้องโทรสอบถามโรงพยาบาล</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>เจ้าหน้าที่:</strong> บันทึกค่า INR ทันทีหลังตรวจ เพื่อให้ผู้ป่วยทราบเร็ว</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>เจ้าหน้าที่:</strong> ตรวจสอบ Dashboard ทุกวันเพื่อระวังผู้ป่วยที่มีความเสี่ยง</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    setShowTutorial(false);
                    navigate("/role-selection");
                  }}
                  className="flex-1 h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl text-lg"
                >
                  เริ่มใช้งานทันที
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTutorial(false)}
                  className="flex-1 h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl text-lg"
                >
                  ปิดหน้าต่าง
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}