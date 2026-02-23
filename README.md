
  # Warfarin Care web application

  This is a code bundle for Warfarin Care web application. The original project is available at https://www.figma.com/design/uF4Tprn3el0wtyCzcORHza/Warfarin-Care-web-application.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  flowchart TB
  %% =========================
  %% Coaguard – End-to-End System Flow (Single Big Diagram)
  %% =========================

  %% ---------- Frontend ----------
  subgraph FE[Frontend (Web App)]
    LP[Landing Page /]
    RS[Role Selection /role-selection]
    LG[Login /login]
    HOSP[Hospital App /hospital/*]
    PAT[Patient App /patient/*]
    SOS[SOS Button (1669) ทุกหน้า]
  end

  %% ---------- Backend ----------
  subgraph BE[Backend API (FastAPI/NestJS)]
    AUTH[Auth Module\nJWT + Refresh]
    RBAC[RBAC Guard\nRole Check]
    PATS[Patients Module]
    INR[INR Records Module\ncalculate status]
    MEDS[Medication Logs Module\nschedule + confirm]
    APPT[Appointments Module]
    SAFE[Safety Items Module\nPublic Search]
    NOTI[Notifications Module\nDB + (Optional SSE/WS)]
    ANL[Analytics Module]
    CRON[Cron/Scheduler\n00:00 missed\n09:00 appt reminder]
  end

  %% ---------- Database ----------
  subgraph DB[(PostgreSQL Database)]
    U[(users)]
    S[(hospital_staff)]
    P[(patients)]
    R[(inr_records)]
    M[(medication_logs)]
    A[(appointments)]
    SF[(safety_items)]
    N[(notifications)]
  end

  %% ---------- Public Flow ----------
  LP --> RS --> LG
  SOS -. emergency call .-> SOS

  %% ---------- Auth Flow ----------
  LG -->|POST /api/auth/login\n{email,password,role}| AUTH
  AUTH -->|verify user + bcrypt| U
  AUTH -->|role=staff? load profile| S
  AUTH -->|role=patient? load profile| P
  AUTH -->|return access_token(24h)+refresh\n+ user + profile| LG

  %% Route after login
  LG -->|role=hospital_staff| HOSP
  LG -->|role=patient| PAT

  %% ---------- RBAC Gate ----------
  HOSP -->|API calls| RBAC
  PAT -->|API calls| RBAC
  RBAC -->|JWT validate| AUTH

  %% ---------- Hospital Staff System ----------
  RBAC -->|staff only| PATS
  RBAC -->|staff only| INR
  RBAC -->|staff only| MEDS
  RBAC -->|staff only| APPT
  RBAC -->|staff only| ANL
  RBAC -->|staff only (CRUD)| SAFE

  %% Staff: Patient list & detail
  PATS -->|GET /api/patients\n(search/status/sort/pagination)| P
  PATS -->|join latest INR| R
  PATS -->|GET /api/patients/:id| P

  %% Staff: Add/Update INR
  INR -->|POST/PUT /api/inr-records| R
  INR -->|read target_inr_min/max| P
  INR -->|calculate status\nsafe/monitor/danger| INR
  INR -->|if monitor/danger -> create notification| NOTI

  %% Staff: Create medication schedule (30 days)
  MEDS -->|POST /api/medication-logs\n(generate 30 days)| M
  MEDS -->|GET /api/medication-logs/patient/:id| M

  %% Staff: Manage appointments
  APPT -->|POST/PUT/DELETE /api/appointments| A
  APPT -->|GET /api/appointments/patient/:id| A

  %% Analytics
  ANL -->|overview/inr-distribution/adherence| P
  ANL -->|counts + latest status| R
  ANL -->|adherence from taken/missed| M

  %% Safety Items (Public + Staff CRUD)
  SAFE -->|GET /api/safety-items?search&category| SF
  SAFE -->|POST/PUT/DELETE| SF

  %% ---------- Patient System ----------
  RBAC -->|patient only| PATS
  RBAC -->|patient only| INR
  RBAC -->|patient only| MEDS
  RBAC -->|patient only| APPT
  RBAC -->|public| SAFE

  %% Patient: dashboard data
  PAT -->|GET /api/patients/me| PATS
  PAT -->|GET /api/inr-records/me| INR
  PAT -->|GET /api/medication-logs/me| MEDS
  PAT -->|GET /api/appointments/me| APPT
  PAT -->|GET /api/safety-items| SAFE

  %% Patient: confirm medication
  PAT -->|PUT /api/medication-logs/:id/confirm\n{taken_at}| MEDS
  MEDS -->|update status=taken\nconfirmed_by_patient=true| M

  %% ---------- Notifications ----------
  NOTI -->|insert| N
  PAT -->|GET /api/notifications/me| NOTI
  HOSP -->|GET /api/notifications/me| NOTI
  NOTI -->|read user notifications| N
  NOTI -. optional real-time .-> NOTI

  %% ---------- Cron Jobs ----------
  CRON -->|00:00 daily\npending overdue -> missed| M
  CRON -->|create missed reminder| NOTI
  CRON -->|09:00 daily\nappt tomorrow & not sent| A
  CRON -->|create appointment reminder| NOTI
  CRON -->|mark reminder_sent=true| A

  %% ---------- DB links ----------
  S --- U
  P --- U
  R --- P
  M --- P
  A --- P
  N --- U
