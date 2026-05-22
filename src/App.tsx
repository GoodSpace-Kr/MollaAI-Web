import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MessageCircle,
  BarChart3,
  Brain,
  UserX,
  CalendarClock,
  ArrowRight,
  Menu,
  X,
  Star,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  LogIn,
  UserPlus,
  Check,
  Instagram,
  Twitter,
  Facebook,
  Github,
} from "lucide-react";
import { useState, useEffect } from "react";
import logo from "./assest/logo.png";
import AuthModal from "../components/AuthModal";
import FAQItem from "../components/FAQItem";
import { Course, Info, Plan, Problems, Review } from "./constants/mockData";
import Footer from "../components/common/Footer";

interface AuthModalState {
  isOpen: boolean;
  type: "login" | "signup";
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModalState>({
    isOpen: false,
    type: "login",
  });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };

  const openLogin = () => setAuthModal({ isOpen: true, type: "login" });
  const openSignup = () => setAuthModal({ isOpen: true, type: "signup" });

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
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 font-sans antialiased">
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        type={authModal.type}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/80 backdrop-blur-md shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={logo}
              alt="Molla AI Logo"
              className="h-20 lg:h-28 w-auto"
            />
          </div>

          {/* Tablet & PC Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 mx-4">
            {[
              "서비스 소개",
              "학습 코스",
              "요금",
              "후기",
              "FAQ",
              "위치",
              "문의하기",
            ].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => scrollToSection(e, item)}
                className="text-on-surface-variant hover:text-primary transition-colors text-[11px] lg:text-sm font-semibold whitespace-nowrap"
              >
                {item}
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

          {/* Mobile Hamburger (Only below md) */}
          <button
            className="md:hidden p-2 text-on-surface"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white border-t border-surface-container overflow-hidden md:hidden shadow-xl"
            >
              <div className="p-6 flex flex-col gap-4">
                {[
                  "서비스 소개",
                  "학습 코스",
                  "요금",
                  "후기",
                  "FAQ",
                  "위치",
                  "문의하기",
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="text-on-surface-variant py-2 font-semibold"
                    onClick={(e) => scrollToSection(e, item)}
                  >
                    {item}
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

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container/10 text-primary rounded-full text-xs md:text-sm font-bold mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                24시간 언제 어디서나 AI와 함께
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-on-surface leading-[1.05] tracking-tight">
                영어 공포증,
                <br />
                이제 전화 한 통으로 <br />
                <span className="text-primary italic">녹여보세요.</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-on-surface-variant max-w-lg leading-relaxed mx-auto lg:mx-0">
                평가받지 않는 안전한 공간. AI 원어민과 실시간으로 대화하며
                자연스럽게 입을 열어보세요. 당신의 속도와 관심사에 100%
                맞춰줍니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <button
                  onClick={openSignup}
                  className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 group"
                >
                  무료 체험 시작하기
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>
                <button className="bg-secondary-container text-primary px-8 py-5 rounded-2xl font-bold text-lg hover:bg-secondary-container/80 transition-all flex items-center justify-center">
                  서비스 둘러보기
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-sm text-on-surface-variant font-medium justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-surface-container"
                    />
                  ))}
                </div>
                <span>현재 12,430명이 함께 공부하고 있어요</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square md:aspect-video lg:aspect-auto lg:h-[650px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[120px]" />
              <div className="relative z-10 w-full max-w-md bg-white p-6 rounded-[40px] shadow-2xl border border-surface-container transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center">
                      <Brain className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Molla AI Tutor</h4>
                      <p className="text-xs text-on-surface-variant">
                        말하기 학습 중...
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-surface p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed max-w-[80%]">
                      "Hello! How was your day today? Would you like to practice
                      ordering at a cafe?"
                    </div>
                    <div className="bg-primary/10 p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed ml-auto max-w-[80%] text-right font-medium">
                      "I'm good! Yes, I want to practice that. Can I have a
                      latte?"
                    </div>
                    <div className="bg-surface p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed max-w-[80%]">
                      "Great start! Instead of 'Can I have', you could also say
                      'I'd like to order' to sound more natural."
                    </div>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                    <Phone
                      className="text-primary animate-pulse"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problems Section */}
        <section
          id="서비스 소개"
          className="bg-surface-container-low py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              {...fadeIn}
              className="text-center space-y-4 mb-16 md:mb-24"
            >
              <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                The Challenge
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
                왜 우리는 영어 앞에서 작아질까요?
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                기존의 학습 방식이 당신과 맞지 않았을 뿐입니다.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Problems.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[32px] space-y-6 hover:shadow-2xl hover:shadow-primary/5 transition-all group border border-transparent hover:border-surface-container"
                >
                  <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="학습 코스"
          className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <motion.div
            {...fadeIn}
            className="text-center space-y-4 mb-20 md:mb-32"
          >
            <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
              Curriculum
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
              당신에게 필요한 모든 상황
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
              왕초보부터 비즈니스까지, 500개 이상의 테마별 코스
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Course.map((course, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.05 }}
                className={`${course.color} p-8 rounded-3xl hover:-translate-y-2 transition-transform cursor-pointer group`}
              >
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h4>
                <p className="text-on-surface-variant text-sm">{course.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="요금"
          className="py-24 md:py-32 px-6 md:px-12 bg-surface-container-low"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn} className="text-center space-y-6 mb-16">
              <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                Pricing Plans
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
                합리적인 비용으로 시작하세요
              </h2>

              <div className="flex items-center justify-center gap-4 pt-4">
                <span
                  className={`text-sm font-bold ${billingCycle === "monthly" ? "text-primary" : "text-on-surface-variant"}`}
                >
                  월간 결제
                </span>
                <button
                  onClick={() =>
                    setBillingCycle(
                      billingCycle === "monthly" ? "yearly" : "monthly",
                    )
                  }
                  className="w-14 h-8 bg-surface-container rounded-full p-1 relative transition-colors duration-300"
                >
                  <motion.div
                    animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                    className="w-6 h-6 bg-primary rounded-full shadow-md"
                  />
                </button>
                <span
                  className={`text-sm font-bold ${billingCycle === "yearly" ? "text-primary" : "text-on-surface-variant"}`}
                >
                  연간 결제{" "}
                  <span className="ml-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full">
                    20% 할인
                  </span>
                </span>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Plan.map((plan, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-10 rounded-[40px] bg-white border ${plan.popular ? "border-primary shadow-2xl shadow-primary/10" : "border-surface-container shadow-xl shadow-primary/5"} space-y-8`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-on-surface-variant text-sm">
                      {plan.desc}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ₩
                      {billingCycle === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      /월
                    </span>
                  </div>
                  <button
                    className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02]" : "bg-surface text-on-surface hover:bg-surface-container"}`}
                  >
                    요금제 선택하기
                  </button>
                  <ul className="space-y-4 pt-4">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm text-on-surface-variant"
                      >
                        <Check
                          size={18}
                          className="text-primary flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          id="후기"
          className="bg-on-surface py-24 md:py-32 px-6 md:px-12 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
              <motion.div {...fadeIn} className="space-y-4">
                <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                  Testimonials
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  이미 많은 분들이 <br className="hidden lg:block" />
                  변화를 경험했습니다.
                </h2>
              </motion.div>
              <div className="flex gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">4.9/5</div>
                  <div className="text-sm text-on-surface-variant">
                    사용자 만족도
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">50만+</div>
                  <div className="text-sm text-on-surface-variant">
                    누적 통화 건수
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Review.map((review, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg p-10 rounded-[32px] border border-white/10 space-y-6"
                >
                  <div className="flex gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-surface-container">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-sm text-on-surface-variant">
                        {review.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="FAQ"
          className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto"
        >
          <motion.div {...fadeIn} className="text-center space-y-4 mb-16">
            <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
              Support
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
              자주 묻는 질문
            </h2>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-primary/5 border border-surface-container"
          >
            <FAQItem
              question="정말 070 번호로 전화만 걸면 되나요?"
              answer="네, 맞습니다. 별도의 전용 앱 설치나 복잡한 설정 없이, 부여받은 회원 전용 070 번호로 전화를 거시면 바로 대화가 시작됩니다. 해외에서도 로밍 없이 인터넷 전화 등을 통해 이용 가능합니다."
            />
            <FAQItem
              question="무료 체험은 어떻게 진행되나요?"
              answer="회원가입 후 첫 통화(최대 10분)는 완전히 무료로 제공됩니다. 직접 대화해 보시고 AI의 자연스러움을 느껴보세요. 카드 정보 등록도 필요 없습니다."
            />
            <FAQItem
              question="리포트는 언제 받을 수 있나요?"
              answer="통화가 종료된 후 1분 내외로 카카오톡 또는 문자를 통해 상세 리포트 링크가 전송됩니다. 대화 전체 텍스트, 문법 교정, 추천 표현, 그리고 당신의 유창성 점수를 확인하실 수 있습니다."
            />
            <FAQItem
              question="학습 시간 제한이 있나요?"
              answer="요금제에 따라 다르지만, 기본적으로 24시간 언제든 원하실 때 이용 가능합니다. 예약할 필요 없이 당신이 여유 있는 시간이 바로 학습 시간이 됩니다."
            />
          </motion.div>
        </section>

        {/* Location Section */}
        <section
          id="위치"
          className="bg-surface-container-low py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div {...fadeIn} className="space-y-6 md:space-y-8">
                <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                  Visit Us
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
                  찾아오시는 길
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Molla AI 헤드오피스는 인천의 중심, 부평역 인근에 위치하고
                  있습니다. <br />
                  직접 방문하여 서비스를 체험해 보시고 팀원들과 소통해 보세요.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface">주소</div>
                      <div className="text-on-surface-variant">
                        인천광역시 부평구 부평역 광장로 1
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface">전화번호</div>
                      <div className="text-on-surface-variant">
                        070-1234-5678
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface">이메일</div>
                      <div className="text-on-surface-variant">
                        hello@molla.ai
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeIn}
                className="h-[400px] md:h-[500px] bg-surface-container rounded-[40px] overflow-hidden shadow-2xl relative border-8 border-white"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.736511394145!2d126.72149027633215!3d37.489308128224594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7db2384755e1%3A0x6e2572b9a7195861!2sBupyeong%20Station!5e0!3m2!1sen!2skr!4v1715866000000!5m2!1sen!2skr"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="인천 부평역 지도"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="문의하기" className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeIn}
              className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl shadow-primary/5 border border-surface-container"
            >
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-5xl font-bold">문의하기</h2>
                <p className="text-on-surface-variant">
                  비즈니스 제휴, 기업 도입 문의 등 무엇이든 물어보세요.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      이름
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-surface rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                      placeholder="성함을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      이메일
                    </label>
                    <input
                      type="email"
                      className="w-full px-5 py-4 bg-surface rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                    문의 내용
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-5 py-4 bg-surface rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none resize-none"
                    placeholder="문의 내용을 자세히 적어주세요"
                  ></textarea>
                </div>
                <button className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all">
                  문의 보내기
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-primary">
          <motion.div
            {...fadeIn}
            className="max-w-4xl mx-auto text-center space-y-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-on-primary leading-tight">
              당신의 첫 마디를 <br />
              기다리고 있습니다.
            </h2>
            <p className="text-lg md:text-xl text-on-primary/80 max-w-2xl mx-auto">
              지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요. <br />
              카드 등록 없이 즉시 시작할 수 있습니다.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={openSignup}
                className="bg-white text-primary px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-black/10"
              >
                무료로 첫 전화 걸어보기
              </button>
              <button
                onClick={(e) => scrollToSection(e, "요금")}
                className="bg-primary-container text-white px-12 py-6 rounded-2xl font-bold text-xl border-2 border-white/20 hover:bg-white/10 transition-all"
              >
                요금제 확인하기
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
