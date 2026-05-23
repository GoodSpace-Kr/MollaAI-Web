import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

/** 인증 전용 라우트 — 비로그인 유저는 / 로 리다이렉트 */
const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
