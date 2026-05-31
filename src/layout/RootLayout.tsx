import Navigation from "@/components/common/Navigation";
import AuthModal from "@/components/AuthModal";
import DevAuthModal from "@/components/DevAuthModal";
import PaymentModal from "@/components/common/PaymentModal";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

type AuthModalState = {
  isOpen: boolean;
  type: "login" | "signup";
};

type PaymentPlan = {
  planName: string;
  planType: string;
  amount: number;
};

/** Outlet context 타입 — 하위 페이지에서 useOutletContext<RootLayoutContext>()로 사용 */
export type RootLayoutContext = {
  openLogin: () => void;
  openSignup: () => void;
  openSignupWithPayment: (plan: PaymentPlan) => void;
};

const RootLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [authModal, setAuthModal] = useState<AuthModalState>({
    isOpen: false,
    type: "login",
  });
  const [devModalOpen, setDevModalOpen] = useState(false);

  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const { setTokens } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLogin = () => setAuthModal({ isOpen: true, type: "login" });
  const openSignup = () => {
    setPaymentPlan(null);
    setAuthModal({ isOpen: true, type: "signup" });
  };
  const openDevLogin = () => setDevModalOpen(true);

  const openSignupWithPayment = (plan: PaymentPlan) => {
    setPaymentPlan(plan);
    setAuthModal({ isOpen: true, type: "signup" });
  };

  const handleSignupComplete = (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    // 토큰 저장 → isAuthenticated=true → PublicRoute가 /reports로 자동 전환
    setTokens(tokens);
    // PaymentModal은 RootLayout에 마운트되어 있어 라우트 전환 후에도 유지됨
    setPaymentModalOpen(true);
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <Navigation
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openLogin={openLogin}
        openDevLogin={openDevLogin}
        scrollToSection={scrollToSection}
      />

      <Outlet
        context={
          { openLogin, openSignup, openSignupWithPayment } satisfies RootLayoutContext
        }
      />

      {/* 모달은 인증 여부에 관계없이 DOM에 존재하되 isOpen으로 표시 제어 */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        type={authModal.type}
        onSignupComplete={paymentPlan ? handleSignupComplete : undefined}
      />

      <DevAuthModal
        isOpen={devModalOpen}
        onClose={() => setDevModalOpen(false)}
        type="login"
      />

      {paymentPlan && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          planName={paymentPlan.planName}
          planType={paymentPlan.planType}
          amount={paymentPlan.amount}
        />
      )}
    </>
  );
};

export default RootLayout;
