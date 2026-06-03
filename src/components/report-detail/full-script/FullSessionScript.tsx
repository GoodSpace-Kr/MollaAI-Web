import { useMemo, useRef, useState } from "react";
import ScriptMessage, { type ScriptMessageData } from "./ScriptMessage";

export type ScriptFilter = "all" | "user" | "ai" | "proofread" | "good";

export type ScriptMessageItem = ScriptMessageData;

type FullSessionScriptProps = {
  items: ScriptMessageItem[];
};

const FILTERS: { label: string; value: ScriptFilter }[] = [
  { label: "전체", value: "all" },
  { label: "나", value: "user" },
  { label: "AI", value: "ai" },
  // { label: "교정 필요", value: "proofread" },
  // { label: "좋은 표현", value: "good" },
];

const INITIAL_VISIBLE_COUNT = 4;

const FullSessionScript = ({ items }: FullSessionScriptProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<ScriptFilter>("all");
  const [expanded, setExpanded] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    if (activeFilter === "user") {
      return items.filter((item) => item.speaker === "user");
    }
    if (activeFilter === "ai") {
      return items.filter((item) => item.speaker === "ai");
    }
    return items.filter((item) => item.tag === activeFilter);
  }, [activeFilter, items]);

  const visibleItems = expanded
    ? filteredItems
    : filteredItems.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = Math.max(filteredItems.length - INITIAL_VISIBLE_COUNT, 0);

  const handleToggleExpanded = () => {
    if (expanded) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setExpanded((prev) => !prev);
  };

  return (
    <section ref={sectionRef} className="flex flex-col gap-6">
      <div>
        <h2 className="text-[#0F172B] text-[26px] font-bold">
          Full Session Script
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setActiveFilter(filter.value);
                setExpanded(false);
              }}
              className={`rounded-full border px-4 py-2 text-[13px] font-bold transition-all ${
                activeFilter === filter.value
                  ? "border-[#5272FF] bg-[#5272FF] text-white"
                  : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#5272FF] hover:text-[#5272FF]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-card">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <ScriptMessage
              key={item.id}
              item={item}
              activeFilter={activeFilter}
            />
          ))
        ) : (
          <div className="px-8 py-12 text-center text-[#64748B]">
            표시할 스크립트가 없습니다.
          </div>
        )}

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={handleToggleExpanded}
            className="w-full bg-white py-5 text-[15px] font-bold text-[#5272FF] transition-colors hover:bg-[#EEF2FF]"
          >
            {expanded
              ? "줄이기"
              : `스크립트 더보기 (Show ${hiddenCount} more lines)`}
          </button>
        )}
      </div>
    </section>
  );
};

export default FullSessionScript;
