import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
};

const AuthModal = ({ isOpen, onClose, type }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(
    type || "login",
  );

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
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`text-lg font-bold transition-colors ${activeTab === "login" ? "text-primary" : "text-on-surface-variant"}`}
                >
                  로그인
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`text-lg font-bold transition-colors ${activeTab === "signup" ? "text-primary" : "text-on-surface-variant"}`}
                >
                  회원가입
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {activeTab === "signup" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                    이름
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="example@molla.ai"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 ml-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
                />
              </div>
              <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all mt-4">
                {activeTab === "login" ? "로그인하기" : "가입하기"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-surface-container text-center">
              <p className="text-sm text-on-surface-variant">
                {activeTab === "login"
                  ? "계정이 없으신가요?"
                  : "이미 계정이 있으신가요?"}
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "login" ? "signup" : "login")
                  }
                  className="ml-2 text-primary font-bold hover:underline"
                >
                  {activeTab === "login" ? "지금 가입하기" : "로그인하기"}
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
