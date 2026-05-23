import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, X } from "lucide-react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
};

type AuthStep = "phone" | "code" | "name";

const CODE_TIME_LIMIT = 300;

const AuthModal = ({ isOpen, onClose, type }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(type);
  const [step, setStep] = useState<AuthStep>("phone");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [timeLeft, setTimeLeft] = useState(CODE_TIME_LIMIT);

  const isSignup = activeTab === "signup";
  const isCodeExpired = step === "code" && timeLeft <= 0;

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60,
  ).padStart(2, "0")}`;

  useEffect(() => {
    if (isOpen) {
      setActiveTab(type);
      setStep("phone");
      setPhone("");
      setCode("");
      setName("");
      setTimeLeft(CODE_TIME_LIMIT);
    }
  }, [isOpen, type]);

  useEffect(() => {
    if (step !== "code" || timeLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [step, timeLeft]);

  const resetCodeStep = () => {
    setCode("");
    setTimeLeft(CODE_TIME_LIMIT);
    setStep("code");
  };

  const handleSendCode = () => {
    if (!phone.trim()) return;

    // TODO: SMS 인증번호 전송 API 연결
    resetCodeStep();
  };

  const handleVerifyCode = () => {
    if (!code.trim() || isCodeExpired) return;

    // TODO: 인증번호 확인 API 연결
    if (isSignup) {
      setStep("name");
      return;
    }

    // TODO: 로그인 성공 처리
    onClose();
  };

  const handleSignupComplete = () => {
    if (!name.trim()) return;

    // TODO: 이름 등록 API 연결
    onClose();
  };

  const handlePrevStep = () => {
    if (step === "code") {
      setStep("phone");
      setCode("");
      return;
    }

    if (step === "name") {
      resetCodeStep();
    }
  };

  const changeAuthType = () => {
    setActiveTab((prev) => (prev === "login" ? "signup" : "login"));
    setStep("phone");
    setPhone("");
    setCode("");
    setName("");
    setTimeLeft(CODE_TIME_LIMIT);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="relative flex items-center justify-center mb-8">
              {step !== "phone" && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="absolute left-0 p-2 hover:bg-surface rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <div className="text-xl font-bold">
                {isSignup ? "회원가입" : "로그인"}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="absolute right-0 p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    step === "phone" ? "bg-primary" : "bg-surface-container"
                  }`}
                />
                <div
                  className={`h-2 w-2 rounded-full ${
                    step === "code" ? "bg-primary" : "bg-surface-container"
                  }`}
                />
                {isSignup && (
                  <div
                    className={`h-2 w-2 rounded-full ${
                      step === "name" ? "bg-primary" : "bg-surface-container"
                    }`}
                  />
                )}
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {step === "phone" && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01012345678"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <p className="text-xs text-on-surface-variant ml-1 leading-relaxed">
                    입력한 전화번호로 인증번호가 전송됩니다.
                  </p>

                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!phone.trim()}
                  >
                    인증번호 받기
                  </button>
                </>
              )}

              {step === "code" && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      인증번호
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="인증번호 6자리"
                        maxLength={6}
                        className={`w-full px-4 py-3 pr-16 bg-surface rounded-xl border transition-all outline-none ${
                          isCodeExpired
                            ? "border-red-500 focus:border-red-500 focus:bg-white"
                            : "border-transparent focus:border-primary focus:bg-white"
                        }`}
                      />

                      <span
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold ${
                          isCodeExpired ? "text-red-500" : "text-primary"
                        }`}
                      >
                        {formattedTime}
                      </span>
                    </div>

                    {isCodeExpired && (
                      <p className="mt-1 ml-2 text-xs text-red-500">
                        인증 시간이 만료되었습니다. 인증번호를 다시 받아주세요.
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center px-1">
                    <p className="text-xs text-on-surface-variant">
                      {phone}로 전송된 인증번호를 입력하세요.
                    </p>

                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      재전송
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!code.trim() || isCodeExpired}
                  >
                    인증하기
                  </button>
                </>
              )}

              {step === "name" && isSignup && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                      이름
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <p className="text-xs text-on-surface-variant ml-1 leading-relaxed">
                    서비스에서 사용할 이름을 입력하면 회원가입이 완료됩니다.
                  </p>

                  <button
                    type="button"
                    onClick={handleSignupComplete}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!name.trim()}
                  >
                    가입 완료하기
                  </button>
                </>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                {isSignup ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}
                <button
                  type="button"
                  onClick={changeAuthType}
                  className="ml-2 text-primary font-bold hover:underline"
                >
                  {isSignup ? "로그인하기" : "지금 가입하기"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
