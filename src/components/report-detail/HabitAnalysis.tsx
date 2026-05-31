import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fadeIn } from "@/pages/LandingPage";

export type HabitAnalysisItem = {
  id: number;
  title: string;
  evidence: string;
  suggestion: string;
};

type HabitAnalysisProps = {
  items: HabitAnalysisItem[];
};

const HabitAnalysis = ({ items }: HabitAnalysisProps) => {
  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex flex-col gap-8 flex-1 min-w-0">
      <h2 className="text-[#0F172B] text-[28px] font-bold tracking-[-0.02em]">
        Habit Analysis
      </h2>

      <div className="flex flex-col gap-5">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              {...fadeIn}
              key={item.id}
              className="overflow-hidden rounded-[20px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
            >
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-6 text-left"
              >
                <div className="flex items-center gap-5">
                  <span className="w-[40px] h-[40px] rounded-full bg-[#F1F4FF]" />
                  <span className="text-[#1F2937] text-[17px] font-bold">
                    {item.title}
                  </span>
                </div>

                {isOpen ? (
                  <ChevronDown
                    size={28}
                    strokeWidth={2.5}
                    className="text-[#CBD5E1]"
                  />
                ) : (
                  <ChevronRight
                    size={28}
                    strokeWidth={2.5}
                    className="text-[#CBD5E1]"
                  />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-[#F1F5F9] px-7 py-5 flex flex-col gap-6">
                  <div>
                    <p className="text-[#94A3B8] text-[14px] font-bold uppercase">
                      Evidence
                    </p>
                    <p className="mt-3 text-[#64748B] text-[16px] font-medium leading-7">
                      {item.evidence}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#94A3B8] text-[14px] font-bold uppercase">
                      Suggestion
                    </p>
                    <p className="mt-3 text-[#DC2626] text-[16px] font-bold leading-7">
                      {item.suggestion}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HabitAnalysis;
