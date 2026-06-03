import { AnimatePresence, motion } from "motion/react";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import logo from "../../assest/logo-name.svg";
import { Navigation as NavItem } from "../../constants/mockData";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import reportIcon from "../../assest/icon/reports.svg";

type NavigationProps = {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openLogin: () => void;
  openDevLogin: () => void;
  scrollToSection: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string,
  ) => void;
};

const Navigation = ({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  openLogin,
  openDevLogin,
  scrollToSection,
}: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, clearAuth, hasHydrated } = useAuthStore();

  const isLandingPage = location.pathname === "/";
  const isDevMode = import.meta.env.DEV;

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
        isScrolled ? "bg-white/80 shadow-sm" : "bg-white/0 shadow-none"
      }`}
    >
      <div className="relative max-w-7xl mx-auto h-[90px] px-6 md:px-12 flex items-center justify-center">
        {/* 로고 */}
        <div
          className="absolute left-6 lg:left-12 flex items-center cursor-pointer shrink-0"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }

            navigate("/");
          }}
        >
          <img src={logo} alt="Molla AI Logo" className="h-8 w-auto" />
        </div>

        {/* 섹션 네비게이션 */}
        {isLandingPage && (
          <div className="hidden md:flex h-[90px] items-center gap-4 lg:gap-8 mx-4">
            {NavItem.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="text-on-surface-variant hover:text-primary transition-colors text-[11px] lg:text-sm font-semibold whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* 데스크톱 버튼 영역 */}
        <div className="hidden md:flex absolute right-6 lg:right-12 items-center justify-end gap-2 lg:gap-4 shrink-0 min-w-[280px]">
          {!hasHydrated ? (
            <div className="h-10 w-full" />
          ) : isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
              >
                <LogOut size={16} className="lg:w-4.5 lg:h-4.5" />
                로그아웃
              </button>

              <button
                onClick={() => {
                  navigate("/reports");
                }}
                className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
              >
                <img src={reportIcon} className="w-4 h-4 lg:w-5 lg:h-5" />
                나의 리포트
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openLogin}
                className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
              >
                <LogIn size={16} className="lg:w-4.5 lg:h-4.5" />
                로그인 / 회원가입
              </button>

              {isDevMode && (
                <button
                  onClick={openDevLogin}
                  className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
                >
                  <LogIn size={16} className="lg:w-4.5 lg:h-4.5" />
                  Dev
                </button>
              )}
            </>
          )}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden p-2 text-on-surface ml-auto"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="
              absolute top-full left-0 w-full
              border-t border-surface-container
              overflow-hidden
              md:hidden
              bg-white/90
              shadow-sm
            "
          >
            <div className="p-6 flex flex-col gap-4">
              {/* 섹션 링크 — 랜딩 페이지에서만 표시 */}
              {isLandingPage &&
                NavItem.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-on-surface-variant py-2 font-semibold"
                    onClick={(e) => scrollToSection(e, item.id)}
                  >
                    {item.label}
                  </a>
                ))}

              {!hasHydrated ? null : isAuthenticated ? (
                // 인증 상태: 로그아웃 버튼
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-surface text-on-surface py-3 rounded-xl font-bold"
                  >
                    로그아웃
                  </button>
                  <button
                    onClick={() => {
                      navigate("/reports");
                    }}
                    className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
                  >
                    <img src={reportIcon} className="w-4 h-4 lg:w-5 lg:h-5" />
                    나의 리포트
                  </button>
                </>
              ) : (
                /* 비인증 상태: 로그인 + Dev 버튼 */
                <div
                  className={`mt-2 ${
                    isDevMode ? "grid grid-cols-2 gap-4" : "w-full"
                  }`}
                >
                  <button
                    onClick={() => {
                      openLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-surface text-on-surface py-3 rounded-xl font-bold"
                  >
                    로그인
                  </button>

                  {isDevMode && (
                    <button
                      onClick={() => {
                        openDevLogin();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-surface text-on-surface py-3 rounded-xl font-bold"
                    >
                      Dev
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
