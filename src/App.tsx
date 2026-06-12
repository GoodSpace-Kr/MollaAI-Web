import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReportListPage from "./pages/ReportListPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import RootLayout from "./layout/RootLayout";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 비로그인 전용 - /reports로 리다이렉트 */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* NicePay 결제 인증 완료 후 리다이렉트 → approvePayment 호출 → /reports */}
        <Route path="/payment/callback" element={<PaymentCallbackPage />} />

        {/* 인증 전용 - /로 리다이렉트 */}
        <Route element={<PrivateRoute />}>
          <Route path="/reports" element={<ReportListPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
