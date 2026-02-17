import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { RoleSelectionPage } from "./pages/RoleSelectionPage";
import { LoginPage } from "./pages/LoginPage";
import { HospitalRoot } from "./components/HospitalRoot";
import { PatientRoot } from "./components/PatientRoot";
import { HospitalDashboardPage } from "./pages/HospitalDashboardPage";
import { PatientDetailPage } from "./pages/PatientDetailPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { PatientDashboardPage } from "./pages/PatientDashboardPage";
import { DoseCalendarPage } from "./pages/DoseCalendarPage";
import { HistoryPage } from "./pages/HistoryPage";
import { RiskAlertPage } from "./pages/RiskAlertPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/role-selection",
    Component: RoleSelectionPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/hospital",
    Component: HospitalRoot,
    children: [
      { 
        index: true, 
        Component: HospitalDashboardPage,
      },
      { path: "dashboard", Component: HospitalDashboardPage },
      { path: "patient/:id", Component: PatientDetailPage },
      { path: "analytics", Component: AnalyticsPage },
    ],
  },
  {
    path: "/patient",
    Component: PatientRoot,
    children: [
      { 
        index: true, 
        Component: PatientDashboardPage,
      },
      { path: "dashboard", Component: PatientDashboardPage },
      { path: "doses", Component: DoseCalendarPage },
      { path: "history", Component: HistoryPage },
      { path: "risk", Component: RiskAlertPage },
    ],
  },
]);