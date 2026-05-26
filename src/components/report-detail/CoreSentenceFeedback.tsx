import { EXPRESSION_STYLE } from "@/constants/reportDetailData";

export type FeedbackItem = {
  id: number;
  originalSentence: string;
  improvedSentence: string;
  keyExpression: string;
  meaning: string;
  variant: "red" | "orange";
};

type CoreSentenceFeedbackProps = {
  items: FeedbackItem[];
};

const CoreSentenceFeedback = ({ items }: CoreSentenceFeedbackProps) => {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white border border-[#eef0f4] shadow-[0_4px_12px_rgba(15,23,42,0.08)]">
      <div className="px-8 md:px-10 py-10">
        <h2 className="text-[#0F172B] text-[24px] font-bold tracking-[-0.02em]">
          Core Sentence Feedback
        </h2>
        <p className="mt-2 text-[#777777] text-[15px] font-medium">
          교정된 문장과 함께 실전에서 자주 쓰이는 핵심 표현을 익혀보세요.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-y border-[#EEF2F7]">
              <th className="w-[90px] px-8 py-5 text-left text-[12px] font-bold tracking-[0.08em] text-[#9AA7BD]">
                NO
              </th>
              <th className="px-6 py-5 text-left text-[12px] font-bold tracking-[0.08em] text-[#9AA7BD]">
                ORIGINAL SENTENCE
              </th>
              <th className="px-6 py-5 text-left text-[12px] font-bold tracking-[0.08em] text-[#9AA7BD]">
                IMPROVED SENTENCE
              </th>
              <th className="px-6 py-5 text-left text-[12px] font-bold tracking-[0.08em] text-[#9AA7BD]">
                KEY EXPRESSION
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const style = EXPRESSION_STYLE[item.variant];

              return (
                <tr
                  key={item.id}
                  className="odd:bg-white even:bg-[#F8FAFC] border-b border-[#F1F5F9]"
                >
                  <td className="px-8 py-8 text-[#94A3B8] text-[16px] font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-6 py-8 text-[#334155] text-[16px] font-medium">
                    {item.originalSentence}
                  </td>

                  <td className="px-6 py-8 text-[#5272FF] text-[16px] font-bold">
                    {item.improvedSentence}
                  </td>

                  <td className="px-6 py-8">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`w-fit rounded-md px-2 py-1 text-[16px] font-bold ${style.bg} ${style.text}`}
                      >
                        {item.keyExpression}
                      </span>
                      <span className="text-[#111827] text-[13px] font-medium">
                        : {item.meaning}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CoreSentenceFeedback;
