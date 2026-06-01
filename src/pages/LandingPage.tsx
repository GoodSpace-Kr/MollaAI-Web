import { motion } from "motion/react";
import {
  Phone,
  Brain,
  ArrowRight,
  Star,
  MapPin,
  Mail,
  Check,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import FAQItem from "../components/FAQItem";
import Footer from "../components/common/Footer";
import { Course, FAQ, Plan, Problems, Review } from "../constants/mockData";
import type { RootLayoutContext } from "@/layout/RootLayout";
import { useState } from "react";
import AlertModal from "@/components/common/AlertModal";
import { createInquiry } from "@/api/feedbackApi";
import molla from "../assest/logo.svg";

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export default function LandingPage() {
  const { openSignup, openSignupWithPayment } =
    useOutletContext<RootLayoutContext>();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createInquiry({
        name: form.name || undefined,
        email: form.email || undefined,
        content: form.content,
      });
      setForm({ name: "", email: "", content: "" });
      setAlertModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 font-sans antialiased">
      <main>
        {/* Hero Section */}
        <section className="pb-16 pt-35 md:pt-40 md:pb-24 lg:pb-25 px-6 lg:px-10 max-w-7xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 bg-primary-container/10 text-primary rounded-full text-xs md:text-sm font-bold mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                24시간 언제 어디서나 Molla와 함께
              </div>
              <h1 className="text-5xl md:text-[76px] font-bold text-on-surface leading-[1.05] tracking-tight">
                영어 공포증,
                <br />
                이제 전화 한 통으로 <br />
                <div className="text-3xl md:text-5xl text-primary pt-6">
                  070-5236-1004
                </div>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-on-surface-variant  leading-relaxed mx-auto lg:mx-0">
                AI 원어민과 실시간으로 대화하며 자연스럽게 입을 열어보세요.{" "}
                <br />
                고객님의 속도와 관심사에 100% 맞춰줍니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={openSignup}
                  className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 group"
                >
                  무료 체험 시작하기
                  <ArrowRight className="" size={20} />
                </button>
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
                  <div className="flex items-center gap-3 ml-2">
                    <img src={molla} className="h-6" />
                    <div>
                      <h4 className="font-bold mt-1">Molla AI Tutor</h4>
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
              <div className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                The Challenge
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
                왜 우리는 영어 앞에서 작아질까요?
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                기존의 학습 방식이 고객님과 맞지 않았을 뿐입니다.
              </p>
            </motion.div>

            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
              {Problems.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col bg-white p-10 items-center rounded-[32px] space-y-6 hover:shadow-2xl hover:shadow-primary/5 transition-all group border border-transparent hover:border-surface-container"
                >
                  <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-center whitespace-pre-line">
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
            <div className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
              Curriculum
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
              고객님에게 필요한 모든 상황
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
          <div className="md:max-w-7xl mx-auto">
            <motion.div {...fadeIn} className="text-center space-y-6 mb-16">
              <div className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                Pricing Plans
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
                합리적인 비용으로 시작하세요
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mx-50">
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
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p
                      className={` ${
                        plan.name === "Beginner"
                          ? "text-[#64748B] font-medium"
                          : "text-primary font-bold"
                      }`}
                    >
                      {plan.desc}
                    </p>
                  </div>
                  {plan.showButton && (
                    <button
                      type="button"
                      disabled={plan.disabled}
                      onClick={() => {
                        if (plan.disabled) return;
                        if (plan.planType && plan.amount) {
                          openSignupWithPayment({
                            planName: plan.name,
                            planType: plan.planType,
                            amount: plan.amount,
                          });
                        } else {
                          openSignup();
                        }
                      }}
                      className={`
                        w-full py-4 rounded-2xl font-bold transition-all
                        ${
                          plan.disabled
                            ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                            : plan.popular
                              ? "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02]"
                              : "bg-surface text-on-surface hover:bg-surface-container"
                        }
                      `}
                    >
                      {plan.buttonText}
                    </button>
                  )}
                  <ul className="space-y-4">
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

        {/* FAQ Section */}
        <section
          id="FAQ"
          className="py-24 md:py-32 px-6 md:px-12 max-w-[950px] mx-auto"
        >
          <motion.div {...fadeIn} className="text-center space-y-6 mb-16">
            <div className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
              Support
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
              자주 묻는 질문
            </h2>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="bg-white rounded-[32px] px-12 py-6 shadow-xl shadow-primary/5 border border-surface-container whitespace-pre-line"
          >
            {FAQ.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </motion.div>
        </section>

        {/* Location Section */}
        <section
          id="위치"
          className="bg-surface-container-low py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div {...fadeIn} className="space-y-6">
                <div className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                  Visit Us
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-on-surface">
                  찾아오시는 길
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  MollaTalk 헤드오피스는 성공회대학교 내부에 위치하고 있습니다.{" "}
                  <br />
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
                        서울특별시 구로구 연동로 320, 구로마을대학 S1호 (항동,
                        성공회대학교)
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
                        010-5780-7344
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
                        goodspace82@gmail.com
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.855349022532!2d126.82258207533602!3d37.487739728643405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6261e34e06e3%3A0xcbd0485192bc91e6!2z7ISx6rO17ZqM64yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1780153026509!5m2!1sko!2skr"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="성공회대학교 지도"
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
                <p className="text-on-surface-variant leading-tight">
                  여러분의 의견이 더 나은 서비스로 이어집니다.
                  <br />
                  불편했던 점, 좋았던 점, 개선 아이디어를 자유롭게 남겨주세요.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      이름 (선택)
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-5 py-4 bg-surface rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                      placeholder="성함을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      이메일 (선택)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-5 py-4 bg-surface rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                    문의 내용
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.content}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, content: e.target.value }))
                    }
                    className="w-full px-5 py-4 bg-surface rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none resize-none"
                    placeholder="문의 내용을 자세히 적어주세요"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "전송 중..." : "문의 보내기"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0D33E3]">
          <motion.div
            {...fadeIn}
            className="max-w-4xl mx-auto text-center space-y-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-on-primary leading-tight">
              고객님의 첫 마디를 <br />
              기다리고 있습니다
            </h2>
            <p className="text-lg md:text-xl text-on-primary/80 max-w-2xl mx-auto">
              지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요. <br />
              카드 등록 없이 즉시 시작할 수 있습니다.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-6 justify-center">
              {/* <button
                onClick={openSignup}
                className="bg-white text-primary px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-black/10"
              >
                무료로 첫 전화 걸어보기
              </button> */}
              <button
                onClick={() => scrollToSection("요금")}
                className="bg-primary/90 text-white px-12 py-6 rounded-2xl font-bold text-xl border-2 border-white/20 hover:bg-white/10 transition-all"
              >
                요금제 확인하기
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <AlertModal
        isOpen={alertModalOpen}
        message="소중한 피드백이 정상적으로 전달되었습니다."
        subMessage="보내주신 의견은 서비스 개선에 적극 반영될 예정입니다."
        onClose={() => setAlertModalOpen(false)}
      />
      <Footer />
    </div>
  );
}
