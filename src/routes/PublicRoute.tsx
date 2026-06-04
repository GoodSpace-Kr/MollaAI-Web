import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

/** 공개 라우트 — 인증 유저는 /reports로 이동 */
const PublicRoute = () => {
  const context = useOutletContext();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/reports" replace />;
  }

  return <Outlet context={context} />;
};

export default PublicRoute;
