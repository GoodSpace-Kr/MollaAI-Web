// 개발용 인증창 (추후 삭제)

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { devLogin } from "@/api/authApi1";
import { registerUser } from "@/api/authApi";
import { useAuthStore } from "@/stores/authStore";
import DevStepIndicator from "./DevStepIndicator";

type DevAuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
};

type DevAuthStep = "phone" | "name";

const DevAuthModal = ({ isOpen, onClose, type }: DevAuthModalProps) => {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState<"login" | "signup">(type);
  const [step, setStep] = useState<DevAuthStep>("phone");

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  // 신규 회원의 경우 이름 등록 완료 전까지 토큰을 임시 보관
  // (바로 setTokens하면 isAuthenticated=true → PublicRoute가 /reports로 리다이렉트)
  const [pendingTokens, setPendingTokens] = useState<{
    accessToken: string;
    refreshToken: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isSignup = activeTab === "signup";

  useEffect(() => {
    if (isOpen) {
      setActiveTab(type);
      setStep("phone");
      setPhone("");
      setName("");
      setErrorMessage("");
      setPendingTokens(null);
    }
  }, [isOpen, type]);

  const handleDevLogin = async () => {
    if (!phone.trim()) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await devLogin({
        phoneNumber: phone,
      });

      if (isSignup) {
        // 신규 회원: 이름 등록 완료 전까지 토큰을 임시 보관
        // (setTokens를 여기서 호출하면 isAuthenticated=true → PublicRoute가 바로 리다이렉트)
        setPendingTokens({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
        setStep("name");
        return;
      }

      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      onClose();
      navigate("/reports");
    } catch {
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterName = async () => {
    if (!name.trim() || !pendingTokens) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      const user = await registerUser({
        username: name,
      });

      // 이름 등록 성공 후 토큰 저장 → isAuthenticated=true (이 시점에 인증 완료)
      setTokens(pendingTokens);
      setUser(user);

      onClose();
      navigate("/reports");
    } catch {
      setErrorMessage("이름 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevStep = () => {
    setStep("phone");
    setName("");
    setErrorMessage("");
  };

  const changeAuthType = () => {
    setActiveTab((prev) => (prev === "login" ? "signup" : "login"));
    setStep("phone");
    setPhone("");
    setName("");
    setErrorMessage("");
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

            <form className="" onSubmit={(e) => e.preventDefault()}>
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

                  <p className="text-xs text-on-surface-variant ml-1 mt-2 leading-relaxed">
                    SMS 인증 없이 전화번호만으로 토큰을 발급합니다.
                  </p>

                  <div className="pt-2 pb-3">
                    <DevStepIndicator step={step} isSignup={isSignup} />
                  </div>

                  <button
                    type="button"
                    onClick={handleDevLogin}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!phone.trim() || isLoading}
                  >
                    {isLoading
                      ? "처리 중..."
                      : isSignup
                        ? "다음 이름등록"
                        : "로그인하기"}
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

                  <p className="text-xs text-on-surface-variant ml-1 mt-2 leading-relaxed">
                    토큰 발급이 완료되었습니다. 이름을 등록하면 가입이
                    완료됩니다.
                  </p>

                  <div className="pt-2 pb-3">
                    <DevStepIndicator step={step} isSignup={isSignup} />
                  </div>

                  <button
                    type="button"
                    onClick={handleRegisterName}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!name.trim() || isLoading}
                  >
                    {isLoading ? "가입 중..." : "가입 완료하기"}
                  </button>
                </>
              )}

              {errorMessage && (
                <p className="text-sm text-red-500 text-center">
                  {errorMessage}
                </p>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                {isSignup ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}
                <button
                  type="button"
                  onClick={changeAuthType}
                  className="ml-2 text-primary font-bold hover:underline"
                  disabled={isLoading}
                >
                  {isSignup ? "로그인하기" : "회원가입하기"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DevAuthModal;
