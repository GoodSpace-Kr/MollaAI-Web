import { Outlet, useOutletContext } from "react-router-dom";

/** 공개 라우트 — 인증/비인증 모두 접근 가능 */
const PublicRoute = () => {
  const context = useOutletContext();

  return <Outlet context={context} />;
};

export default PublicRoute;
