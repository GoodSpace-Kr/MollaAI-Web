import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

/** 비로그인 전용 라우트 — 인증된 유저는 /reports로 리다이렉트 */
const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const context = useOutletContext(); // RootLayout의 context를 하위 페이지로 그대로 전달
  return isAuthenticated ? <Navigate to="/reports" replace /> : <Outlet context={context} />;
};

export default PublicRoute;
