
  # Warfarin Care web application

  This is a code bundle for Warfarin Care web application. The original project is available at https://www.figma.com/design/uF4Tprn3el0wtyCzcORHza/Warfarin-Care-web-application.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## System Flow (Frontend)

```mermaid
flowchart TB

START([User เปิดเว็บไซต์])
START --> LANDING[Landing Page]
LANDING --> ROLE[Role Selection]
ROLE --> LOGIN[Login Page]

LOGIN --> AUTH_CALL[POST /api/auth/login]
AUTH_CALL --> STORE[Store JWT Token]

STORE --> ROUTE{Role ?}

ROUTE -->|Hospital Staff| HOSP_DASH[Hospital Dashboard]
ROUTE -->|Patient| PAT_DASH[Patient Dashboard]

HOSP_DASH --> VIEW_PATIENTS[ดูรายชื่อผู้ป่วย]
HOSP_DASH --> VIEW_ANALYTICS[ดูสถิติ]
VIEW_PATIENTS --> PAT_DETAIL[ดูรายละเอียดผู้ป่วย]
PAT_DETAIL --> ADD_INR[เพิ่มค่า INR]
PAT_DETAIL --> CREATE_MED[สร้างตารางยา]
PAT_DETAIL --> CREATE_APPT[สร้างนัดหมาย]

PAT_DASH --> VIEW_INR[ดูค่า INR ล่าสุด]
PAT_DASH --> VIEW_CAL[ดูปฏิทินยา]
PAT_DASH --> VIEW_APPT[ดูนัดหมาย]
VIEW_CAL --> CONFIRM_MED[กดยืนยันกินยา]
PAT_DASH --> SAFETY[ค้นหาอาหาร/ยา]
PAT_DASH --> NOTI_CHECK[เช็ค Notification]
PAT_DASH --> SOS[SOS 1669]
```

