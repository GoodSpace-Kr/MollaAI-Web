import subsIcon from "../../assest/subs.svg";
import crownIcon from "../../assest/icon/crown.svg";
import { useState } from "react";
import AlertModal from "../common/AlertModal";

type Props = {
  planName?: string;
  onManageSubscription?: () => void;
};

const SubscriptionPlanCard = ({
  planName = "Premium Plan",
  onManageSubscription,
}: Props) => {
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const handleManageSubscription = () => {
    onManageSubscription?.();
    setAlertModalOpen(true);
  };

  return (
    <>
      <div
        className="relative overflow-hidden rounded-[32px] p-7 md:p-10 flex flex-col w-full"
        style={{
          background: "#19367a",
          boxShadow: "0px 20px 25px -5px #c6d2ff, 0px 8px 10px -6px #c6d2ff",
        }}
      >
        <div
          className="absolute pointer-events-none select-none"
          style={{
            bottom: "-4px",
            right: "0",
            transform: "rotate(12deg)",
          }}
        >
          <img src={subsIcon} alt="" className="w-[120px] h-[125px]" />
        </div>

        <div className="flex flex-col justify-between gap-5">
          {/* 상단 영역 */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[#e0e7ff] text-[14px] font-semibold leading-[20px]">
                현재 구독 플랜
              </p>
              <p className="text-white text-[24px] font-bold leading-[32px]">
                {planName}
              </p>
            </div>

            <div
              className="flex items-center justify-center rounded-[16px] size-[48px] shrink-0"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)",
              }}
            >
              <img src={crownIcon} className="" />
            </div>
          </div>

          {/* 하단 영역 */}
          <div className="flex flex-col gap-2">
            <p className="text-[#90a1b9] text-[15px] font-medium leading-[16px]">
              * 데모버전에서 자동으로 적용되는 플랜입니다. 서비스 정식 출시 후
              변동될 수 있습니다.
            </p>
            <button
              type="button"
              onClick={handleManageSubscription}
              className="bg-white rounded-[12px] py-3 text-[#19367a] text-[15px] font-bold text-center btn-hover-effect"
            >
              구독 관리하기
            </button>
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={alertModalOpen}
        message="정식 출시 이후 이용 가능합니다."
        onClose={() => setAlertModalOpen(false)}
      />
    </>
  );
};

export default SubscriptionPlanCard;
