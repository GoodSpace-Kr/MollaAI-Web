import { useEffect, useRef, useState } from "react";
import ScriptTag, { type ScriptTagType } from "./ScriptTag";
import audioIcon from "../../../assest/icon/audio.svg";
import playIcon from "../../../assest/icon/play.svg";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const resetAudioState = () => {
    setIsPlaying(false);
    setProgress(0);
    setIsLoading(false);
  };

  const handleClick = async () => {
    if (!audioUrl) return;

    const currentAudio = audioRef.current;

    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      resetAudioState();
      return;
    }

    setIsLoading(true);

    try {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener("play", () => {
        setIsPlaying(true);
      });

      audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return;

        const nextProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(nextProgress);
      });

      audio.addEventListener("ended", () => {
        resetAudioState();
        audio.currentTime = 0;
      });

      audio.addEventListener("pause", () => {
        if (audio.currentTime >= audio.duration) return;
        resetAudioState();
      });

      await audio.play();
    } catch (error) {
      console.error("[AudioButton] 재생 실패:", error);
      resetAudioState();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || !audioUrl}
      className="
        relative
        flex
        size-[38px]
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-white
        text-[#94A3B8]
        transition-all
        hover:bg-[#F8FAFC]
        hover:text-[#5272FF]
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      <span
        className="
          absolute
          inset-0
          rounded-full
          border
          border-[#E2E8F0]
        "
      />

      {isPlaying && (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(var(--color-primary) ${progress * 3.6}deg, transparent 0deg)`,
          }}
        />
      )}

      <span className="absolute inset-[2px] rounded-full bg-white" />

      <img
        src={isPlaying ? playIcon : audioIcon}
        alt={isPlaying ? "재생 중" : "오디오 듣기"}
        className="relative z-10 w-3.5 h-3.5"
      />
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
