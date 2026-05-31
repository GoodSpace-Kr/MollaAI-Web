export type ScriptTagType = "proofread" | "good";

type ScriptTagProps = {
  type: ScriptTagType;
};

const TAG_STYLE = {
  proofread: {
    label: "NEED TO PROOFREAD",
    className: "bg-[#FFE8EE] text-[#F43F5E]",
  },
  good: {
    label: "GOOD EXPRESSION",
    className: "bg-[#DCFCE7] text-[#16A34A]",
  },
} as const;

const ScriptTag = ({ type }: ScriptTagProps) => {
  const tag = TAG_STYLE[type];

  return (
    <span
      className={`inline-flex items-center rounded-[4px] px-2 py-1 text-[9px] font-extrabold ${tag.className}`}
    >
      {tag.label}
    </span>
  );
};

export default ScriptTag;
