import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard, Building2 } from "lucide-react";
import {
  PAYMENT_STORAGE_KEY,
  type PendingPayment,
} from "@/pages/PaymentCallbackPage";
import { PAYMENT_CALLBACK_URL } from "@/config/env";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planType: string;
  amount: number;
};

const NICEPAY_SDK_URL = "https://pay.nicepay.co.kr/v1/js/";
const CLIENT_ID = "S2_fb903ce81792411ab6c459ec3a2a82c6";

declare global {
  interface Window {
    AUTHNICE?: {
      requestPay: (options: {
        clientId: string;
        method: string;
        orderId: string;
        amount: number;
        goodsName: string;
        returnUrl: string;
        fnError?: (result: Record<string, unknown>) => void;
      }) => void;
    };
  }
}

const PaymentModal = ({
  isOpen,
  onClose,
  planName,
  planType,
  amount,
}: PaymentModalProps) => {
  const [isNicepayLoaded, setIsNicepayLoaded] = useState(
    () => !!window.AUTHNICE,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || window.AUTHNICE) return;

    const script = document.createElement("script");
    script.src = NICEPAY_SDK_URL;
    script.onload = () => setIsNicepayLoaded(true);
    script.onerror = () => setError("결제 모듈 로드에 실패했습니다.");
    document.head.appendChild(script);
  }, [isOpen]);

  const handleCardPayment = () => {
    if (!window.AUTHNICE || isProcessing) return;

    const orderId = `ORDER-${Date.now()}`;

    const pending: PendingPayment = {
      amount,
      planType,
      orderId,
    };

    sessionStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(pending));

    setIsProcessing(true);
    setError("");

    window.AUTHNICE.requestPay({
      clientId: CLIENT_ID,
      method: "card",
      orderId,
      amount,
      goodsName: `MOLLAI ${planName}`,

      // 백엔드가 NicePay 결과를 먼저 받음
      returnUrl: PAYMENT_CALLBACK_URL,

      fnError: (result) => {
        setIsProcessing(false);
        sessionStorage.removeItem(PAYMENT_STORAGE_KEY);
        setError("결제 중 오류가 발생했습니다.");
        console.error("[Payment Error]", result);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
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
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="text-xl font-bold">결제 수단 선택</div>
              <button
                type="button"
                onClick={onClose}
                className="absolute right-0 p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* <p className="text-center text-sm text-on-surface-variant mb-8">
              <span className="font-bold text-on-surface">{planName}</span> 플랜
              ·{" "}
              <span className="font-bold text-primary">
                {amount.toLocaleString()}원 / 월
              </span>
            </p> */}

            <div className="grid grid-cols-2 gap-4">
              {/* 신용카드 */}
              <div className="border border-surface-container rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 font-bold text-on-surface">
                  <CreditCard size={20} className="text-primary" />
                  신용카드
                </div>
                <p className="text-sm text-on-surface-variant flex-1">
                  나이스페이를 통한 신용/체크카드 결제
                </p>
                <button
                  type="button"
                  onClick={handleCardPayment}
                  disabled={!isNicepayLoaded || isProcessing}
                  className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "처리 중..." : "카드 결제하기"}
                </button>
              </div>

              {/* 무통장 입금 */}
              <div className="border border-surface-container rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 font-bold text-on-surface">
                  <Building2 size={20} className="text-primary" />
                  무통장 입금
                </div>
                <p className="text-sm text-on-surface-variant flex-1">
                  계좌이체 결제
                </p>
                <div className="w-full py-3 bg-surface rounded-xl text-center text-on-surface-variant text-sm">
                  준비 중
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
