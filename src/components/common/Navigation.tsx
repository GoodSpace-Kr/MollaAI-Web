import { AnimatePresence, motion } from "motion/react";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import logo from "../../assest/logo-name.svg";
import { Navigation as NavItem } from "../../constants/mockData";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

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
  const { isAuthenticated, clearAuth } = useAuthStore();

  const isLandingPage = location.pathname === "/";
  const isDevMode = import.meta.env.DEV;

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="relative max-w-7xl mx-auto h-[90px] px-6 lg:px-12 flex items-center justify-center">
        {/* 로고 */}
        <div
          className="absolute left-6 lg:left-12 flex items-center cursor-pointer shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={logo} alt="Molla AI Logo" className="h-8 w-auto" />
        </div>

        {/* 섹션 네비게이션 — 랜딩 페이지에서만 표시 */}
        {isLandingPage && (
          <div className="hidden md:flex items-center gap-4 lg:gap-8 mx-4 ">
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
        <div className="hidden md:flex absolute right-6 lg:right-12 items-center gap-2 lg:gap-4 shrink-0">
          {isAuthenticated ? (
            /* 인증 상태: 로그아웃 버튼 */
            <button
              onClick={handleLogout}
              className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
            >
              <LogOut size={16} className="lg:w-4.5 lg:h-4.5" />
              로그아웃
            </button>
          ) : (
            /* 비인증 상태: 로그인 + Dev 버튼 */
            <>
              <button
                onClick={openLogin}
                className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
              >
                <LogIn size={16} className="lg:w-4.5 lg:h-4.5" />
                로그인
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
            className={`absolute top-full left-0 w-full bg-white border-t border-surface-container overflow-hidden md:hidden shadow-xl ${
              isScrolled
                ? "bg-surface/80 backdrop-blur-md shadow-sm"
                : "bg-transparent"
            }`}
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

              {isAuthenticated ? (
                /* 인증 상태: 로그아웃 버튼 */
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-surface text-on-surface py-3 rounded-xl font-bold"
                >
                  로그아웃
                </button>
              ) : (
                /* 비인증 상태: 로그인 + Dev 버튼 */
                <div
                  className={`mt-2 ${
                    isDevMode
                      ? "grid grid-cols-2 gap-4"
                      : "flex justify-center "
                  }`}
                >
                  <button
                    onClick={() => {
                      openLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-surface text-on-surface py-3 rounded-xl font-bold"
                  >
                    로그인
                  </button>

                  {isDevMode && (
                    <button
                      onClick={() => {
                        openDevLogin();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-surface text-on-surface py-3 rounded-xl font-bold"
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
