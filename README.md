
  # Warfarin Care web application

  This is a code bundle for Warfarin Care web application. The original project is available at https://www.figma.com/design/uF4Tprn3el0wtyCzcORHza/Warfarin-Care-web-application.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## System Flow (Frontend)

```mermaid
flowchart LR

U[User] --> P0((AND))
P0 --> L1[Landing]
P0 --> R1[Role Select]
R1 --> LG[Login]

LG --> A0((AND))
A0 --> T1[Store Token]
A0 --> RT{Role}

RT -->|staff| H0[Hospital App]
RT -->|patient| P1[Patient App]

%% Hospital side
H0 --> H1((AND))
H1 --> H2[Patient List]
H1 --> H3[Analytics]
H2 --> H4[Patient Detail]

H4 --> H5((OR))
H5 --> H6[Add INR]
H5 --> H7[Create Med Plan]
H5 --> H8[Create Appointment]

%% Patient side
P1 --> P2((AND))
P2 --> P3[View Latest INR]
P2 --> P4[View Dose Calendar]
P2 --> P5[View Appointments]

P4 --> P6((OR))
P6 --> P7[Confirm Taken]
P6 --> P8[Mark Missed Note]

%% Shared
H0 --> N0((OR))
P1 --> N0
N0 --> N1[Check Notifications]

H0 --> S0((OR))
P1 --> S0
S0 --> S1[SOS 1669]
```
