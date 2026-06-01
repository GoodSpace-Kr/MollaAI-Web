import { AnimatePresence, motion } from "motion/react";

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  subMessage?: string;
  confirmText?: string;
  onClose: () => void;
};

const AlertModal = ({
  isOpen,
  message,
  subMessage,
  confirmText = "확인",
  onClose,
}: AlertModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-[300px] md:max-w-[550px] overflow-hidden rounded-[10px] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.18)]"
          >
            <div className="flex min-h-[100px] md:min-h-[200px] flex-col items-center justify-center gap-1 md:gap-3 px-4 md:px-8 py-12 text-center text-[12px] md:text-[18px]">
              <p className="font-bold leading-[1.8] text-black">{message}</p>

              {subMessage && (
                <p className="font-bold leading-[1.8] text-black">
                  {subMessage}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                border-t
                border-[#EEF2F7]
                py-3
                md:py-5
                text-[15px]
                md:text-[20px]
                font-bold
                text-primary
                transition-colors
                duration-200
                hover:bg-primary
                hover:text-white
              "
            >
              {confirmText}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
