import AlertIcon from "../../assest/icon/warn.svg?react";
import bookIcon from "../../assest/icon/book.svg";
import { WEAK_POINT_STYLE } from "@/constants/reportDetailData";

export type WeakPointItem = {
  id: number;
  label: string;
  variant: "red" | "orange";
};

type WeakPointsProps = {
  items: WeakPointItem[];
};

const WeakPoints = ({ items }: WeakPointsProps) => {
  return (
    <section className="flex flex-col gap-8 flex-1 min-w-0">
      <h2 className="text-[#0F172B] text-[28px] font-bold tracking-[-0.02em]">
        WeakPoints
      </h2>

      <div className="rounded-[28px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)] p-6 md:p-10">
        <p className="text-[#64748B] text-[17px] font-medium mb-4">
          다음 영역에서 지속적인 실수가 발견되었습니다.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          {items.map((item) => {
            const style = WEAK_POINT_STYLE[item.variant];

            return (
              <div
                key={item.id}
                className={`inline-flex items-center gap-3 rounded-[16px] border px-6 py-3 ${style.bg} ${style.border}`}
              >
                <AlertIcon
                  className="
                    w-5 h-5 shrink-0
                    [&_path]:fill-[var(--icon-color)]
                    [&_path]:stroke-[var(--icon-color)]
                    [&_circle]:fill-[var(--icon-color)]
                    [&_circle]:stroke-[var(--icon-color)]
                  "
                  style={
                    {
                      "--icon-color": style.icon,
                    } as React.CSSProperties
                  }
                />

                <span className={`text-[17px] font-bold ${style.text}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-3 md:px-7 md:py-6 flex items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1 md:gap-5">
            <div className="w-[35px] h-[35px] md:w-[58px] md:h-[58px] rounded-[10px] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)] flex items-center justify-center">
              <img
                src={bookIcon}
                alt=""
                className="w-4 h-4 md:w-7 md:h-7 object-contain"
              />
            </div>

            <div>
              <p className="text-[#0F172B] text-[18px] font-bold">
                추천 학습 연습
              </p>
              <p className="text-[#64748B] text-[15px] font-medium">
                주어-동사 수 일치를 주의하여 다시 연습하기
              </p>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 bg-[#316FFF] text-white px-8 py-3.5 rounded-[14px] text-[16px] font-bold"
          >
            시작하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeakPoints;
