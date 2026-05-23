import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReportListPage from "./pages/ReportListPage";
import RootLayout from "./layout/RootLayout";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 비로그인 전용 — 로그인된 유저는 /reports로 리다이렉트 */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* 인증 전용 — 비로그인 유저는 /로 리다이렉트 */}
        <Route element={<PrivateRoute />}>
          <Route path="/reports" element={<ReportListPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
