import { useRef, useState } from "react";
import ScriptTag, { type ScriptTagType } from "./ScriptTag";
import audioIcon from "../../../assest/icon/audio.svg";

type ScriptCorrection = {
  text: string;
  translation: string;
  grammar: string;
  tip: string;
};

export type ScriptMessageData = {
  id: number;
  speaker: "user" | "ai";
  name: string;
  time: string;
  text: string;
  translation: string;
  tag?: ScriptTagType;
  correction?: ScriptCorrection;
  audioUrl?: string;
};

type ScriptMessageProps = {
  item: ScriptMessageData;
};

const AudioButton = ({ audioUrl }: { audioUrl?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = async () => {
    if (!audioUrl) return;

    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    setIsLoading(true);
    try {
      const newAudio = new Audio(audioUrl);
      audioRef.current = newAudio;
      await newAudio.play();
    } catch (error) {
      console.error("[AudioButton] 재생 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || !audioUrl}
      className="flex size-[38px] shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#94A3B8] transition-all hover:bg-[#F8FAFC] hover:text-[#5272FF] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <img src={audioIcon} className="w-3.5 h-3.5" />
    </button>
  );
};

const ScriptMessage = ({ item }: ScriptMessageProps) => {
  const isAI = item.speaker === "ai";

  return (
    <div
      className={`flex gap-5  px-8 py-7 last:border-b-0 ${!isAI ? "bg-[#2457FD]/5" : ""}`}
    >
      <div
        className={`flex size-[48px] shrink-0 items-center justify-center rounded-[14px] ${
          isAI ? "bg-[#64748B]" : "bg-[#94A3B8]"
        }`}
      >
        <span className="text-[18px] font-black text-white">
          {isAI ? "AI" : "나"}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[13px] font-extrabold text-[#0F172B]">
            {item.name}
          </span>
        </div>

        <p className="text-[17px] font-medium leading-7 text-[#1E293B]">
          {item.text}
        </p>

        {isAI && (
          <p className="mt-2 text-[13px] font-medium leading-6 text-[#7D8797]">
            {item.translation}
          </p>
        )}
      </div>

      {!isAI && (
        <div className="flex shrink-0 flex-col items-center gap-4 pt-1">
          <AudioButton audioUrl={item.audioUrl} />
        </div>
      )}
    </div>
  );
};

export default ScriptMessage;
