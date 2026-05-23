import { AnimatePresence, motion } from "motion/react";
import { LogIn, Menu, UserPlus, X } from "lucide-react";
import logo from "../../assest/logo.png";
import { Navigation as NavItem } from "../../constants/mockData";

type NavigationProps = {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openLogin: () => void;
  openSignup: () => void;
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
  openSignup,
  scrollToSection,
}: NavigationProps) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={logo} alt="Molla AI Logo" className="h-20 lg:h-30 w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-8 mx-4">
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

        <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
          <button
            onClick={openLogin}
            className="text-on-surface font-semibold text-[11px] lg:text-sm px-2 lg:px-4 py-2 hover:text-primary transition-colors flex items-center gap-1 lg:gap-2"
          >
            <LogIn size={16} className="lg:w-[18px] lg:h-[18px]" />
            로그인
          </button>

          <button
            onClick={openSignup}
            className="bg-primary text-on-primary px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-bold text-[11px] lg:text-sm hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-1 lg:gap-2 whitespace-nowrap"
          >
            <UserPlus size={16} className="lg:w-[18px] lg:h-[18px]" />
            무료 시작
          </button>
        </div>

        <button
          className="md:hidden p-2 text-on-surface"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-t border-surface-container overflow-hidden md:hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {NavItem.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-on-surface-variant py-2 font-semibold"
                  onClick={(e) => scrollToSection(e, item.id)}
                >
                  {item.label}
                </a>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  onClick={() => {
                    openLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-surface text-on-surface py-3 rounded-xl font-bold"
                >
                  로그인
                </button>

                <button
                  onClick={() => {
                    openSignup();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-primary text-on-primary py-3 rounded-xl font-bold"
                >
                  시작하기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
