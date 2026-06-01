import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser, sendAuthCode, verifyAuthCode } from "@/api/authApi";
import { useAuthStore } from "@/stores/authStore";
import StepIndicator from "./StepIndicator";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAuthComplete?: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => void;
};

type AuthStep = "phone" | "code" | "name";

const CODE_TIME_LIMIT = 300;

const AuthModal = ({ isOpen, onClose, onAuthComplete }: AuthModalProps) => {
  const navigate = useNavigate();

  const { setTokens, setUser } = useAuthStore();

  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [timeLeft, setTimeLeft] = useState(CODE_TIME_LIMIT);

  // 신규 회원의 경우 이름 등록 완료 전까지 토큰을 임시 보관
  // (바로 setTokens하면 isAuthenticated=true → PublicRoute가 /reports로 리다이렉트)
  const [pendingTokens, setPendingTokens] = useState<{
    accessToken: string;
    refreshToken: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isCodeExpired = step === "code" && timeLeft <= 0;

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60,
  ).padStart(2, "0")}`;

  useEffect(() => {
    if (!isOpen) return;

    setStep("phone");
    setPhone("");
    setCode("");
    setName("");
    setErrorMessage("");
    setTimeLeft(CODE_TIME_LIMIT);
    setPendingTokens(null);
  }, [isOpen]);

  useEffect(() => {
    if (step !== "code" || timeLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [step, timeLeft]);

  const resetCodeStep = () => {
    setCode("");
    setErrorMessage("");
    setTimeLeft(CODE_TIME_LIMIT);
    setStep("code");
  };

  const handleSendCode = async () => {
    if (!phone.trim()) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      await sendAuthCode({
        phoneNumber: phone,
      });

      resetCodeStep();
    } catch (error) {
      setErrorMessage("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const completeAuth = (
    tokens: {
      accessToken: string;
      refreshToken: string;
    },
    shouldNavigate = true,
  ) => {
    if (onAuthComplete) {
      onAuthComplete(tokens);
      onClose();
      return;
    }

    setTokens(tokens);
    onClose();

    if (shouldNavigate) {
      navigate("/reports");
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim() || isCodeExpired) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await verifyAuthCode({
        phoneNumber: phone,
        code,
      });

      const tokens = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };

      if (result.isNewUser) {
        setPendingTokens(tokens);
        setStep("name");
        return;
      }

      completeAuth(tokens);
    } catch {
      setErrorMessage("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterName = async () => {
    if (!name.trim() || !pendingTokens) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      const user = await registerUser(
        {
          username: name,
        },
        {
          accessToken: pendingTokens.accessToken,
        },
      );

      setUser(user);
      completeAuth(pendingTokens);
    } catch {
      setErrorMessage("이름 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");

    if (step === "code") {
      setStep("phone");
      setCode("");
      return;
    }

    if (step === "name") {
      resetCodeStep();
    }
  };

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void,
    disabled: boolean,
  ) => {
    if (e.key === "Enter" && !disabled) {
      e.preventDefault();
      action();
    }
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

              <h2 className="text-xl font-bold">
                {step === "phone" && "전화번호 인증"}
                {step === "code" && "인증번호 입력"}
                {step === "name" && "이름 등록"}
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="absolute right-0 p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {step === "phone" && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) =>
                      handleEnterKey(
                        e,
                        handleSendCode,
                        !phone.trim() || isLoading,
                      )
                    }
                    placeholder="01012345678"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                  />

                  <p className="text-xs text-on-surface-variant ml-1 mt-2 leading-relaxed">
                    입력한 전화번호로 인증번호가 전송됩니다.
                  </p>

                  <div className="py-3">
                    <StepIndicator step={step} />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!phone.trim() || isLoading}
                  >
                    {isLoading ? "전송 중..." : "인증번호 받기"}
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
                        onKeyDown={(e) =>
                          handleEnterKey(
                            e,
                            handleVerifyCode,
                            !code.trim() || isCodeExpired || isLoading,
                          )
                        }
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

                  <div className="flex justify-between items-center px-2 mt-1">
                    <p className="text-xs text-on-surface-variant">
                      전송된 인증번호를 입력하세요.
                    </p>

                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="text-xs font-bold text-primary hover:underline disabled:opacity-50"
                      disabled={isLoading}
                    >
                      재전송
                    </button>
                  </div>

                  <div className="py-3">
                    <StepIndicator step={step} />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 disabled:opacity-50"
                    disabled={!code.trim() || isCodeExpired || isLoading}
                  >
                    {isLoading ? "확인 중..." : "인증하기"}
                  </button>
                </>
              )}

              {step === "name" && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) =>
                      handleEnterKey(
                        e,
                        handleRegisterName,
                        !code.trim() || isLoading,
                      )
                    }
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                  />

                  <p className="text-xs text-on-surface-variant ml-1 mt-1 leading-relaxed">
                    신규 사용자입니다. 서비스에서 사용할 이름을 입력해주세요.
                  </p>

                  <div className="py-3">
                    <StepIndicator step={step} />
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
