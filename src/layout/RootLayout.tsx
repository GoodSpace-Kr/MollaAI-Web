import Navigation from "@/components/common/Navigation";
import AuthModal from "@/components/AuthModal";
import DevAuthModal from "@/components/DevAuthModal";
import PaymentModal from "@/components/common/PaymentModal";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

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

  const [authModalOpen, setAuthModalOpen] = useState(false);
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

  const openAuthModal = () => {
    setPaymentPlan(null);
    setAuthModalOpen(true);
  };

  const openLogin = openAuthModal;
  const openSignup = openAuthModal;

  const openDevLogin = () => setDevModalOpen(true);

  const openSignupWithPayment = (plan: PaymentPlan) => {
    setPaymentPlan(plan);
    setAuthModalOpen(true);
  };

  const handleAuthCompleteWithPayment = (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    setTokens(tokens);
    setAuthModalOpen(false);
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

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

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
          {
            openLogin,
            openSignup,
            openSignupWithPayment,
          } satisfies RootLayoutContext
        }
      />

      {/* 모달은 인증 여부에 관계없이 DOM에 존재하되 isOpen으로 표시 제어 */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthComplete={paymentPlan ? handleAuthCompleteWithPayment : undefined}
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
