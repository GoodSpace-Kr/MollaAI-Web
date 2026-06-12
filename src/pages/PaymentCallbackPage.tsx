import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { approvePayment } from "@/api/paymentApi";
import { useAuthStore } from "@/stores/authStore";

const PAYMENT_STORAGE_KEY = "molla-pending-payment";

export type PendingPayment = {
  amount: number;
  planType: string;
  orderId: string;
};

/** NicePay 결제 인증 완료 후 리다이렉트되는 콜백 페이지.
 *  URL 파라미터에서 tid/orderId를 받아 서버 승인 API를 호출하고 /reports로 이동합니다.
 */
const PaymentCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const { hasHydrated, isAuthenticated } = useAuthStore();
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (hasRequestedRef.current) return;

    const handleApprovePayment = async () => {
      hasRequestedRef.current = true;

      if (!isAuthenticated) {
        setErrorMsg(
          "로그인 정보가 없습니다. 다시 로그인 후 결제를 진행해 주세요.",
        );
        return;
      }

      const authResultCode = searchParams.get("authResultCode");
      const tid = searchParams.get("tid");
      const orderId = searchParams.get("orderId");

      if (authResultCode && authResultCode !== "0000") {
        const msg =
          searchParams.get("authResultMsg") ?? "결제 인증에 실패했습니다.";
        setErrorMsg(msg);
        return;
      }

      if (!tid || !orderId) {
        setErrorMsg("결제 정보가 올바르지 않습니다.");
        return;
      }

      const raw = sessionStorage.getItem(PAYMENT_STORAGE_KEY);

      if (!raw) {
        setErrorMsg("결제 플랜 정보가 없습니다. 다시 결제를 진행해 주세요.");
        return;
      }

      const pending = JSON.parse(raw) as PendingPayment;

      if (!pending.amount || !pending.planType || !pending.orderId) {
        setErrorMsg("결제 플랜 정보가 올바르지 않습니다.");
        return;
      }

      if (pending.orderId !== orderId) {
        setErrorMsg("결제 주문 정보가 일치하지 않습니다.");
        return;
      }

      try {
        await approvePayment({
          tid,
          orderId,
          amount: pending.amount,
          planType: pending.planType,
        });

        sessionStorage.removeItem(PAYMENT_STORAGE_KEY);
        navigate("/reports", { replace: true });
      } catch {
        setErrorMsg(
          "결제 승인 처리 중 오류가 발생했습니다. 고객센터에 문의해 주세요.",
        );
      }
    };

    handleApprovePayment();
  }, [hasHydrated, isAuthenticated, navigate, searchParams]);

  if (!hasHydrated) {
    return null;
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <p className="text-xl font-bold text-red-500">{errorMsg}</p>
          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="px-8 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-on-surface-variant font-medium">결제 처리 중...</p>
      </div>
    </div>
  );
};

export { PAYMENT_STORAGE_KEY };
export default PaymentCallbackPage;
