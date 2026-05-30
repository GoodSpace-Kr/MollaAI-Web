import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | "...";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = (): PageItem[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-[48px] h-[48px] rounded-[12px] border border-[#E2E8F0] bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={25} className="text-[#94A3B8]" />
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-10 text-center text-[#94A3B8] text-xl font-bold"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-[48px] h-[48px] rounded-[12px] border text-[16px] font-bold transition-all ${
              currentPage === page
                ? "bg-[#5272FF] text-white border-[#5272FF]"
                : "bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-[48px] h-[48px] rounded-[12px] border border-[#E2E8F0] bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={25} className="text-[#94A3B8]" />
      </button>
    </div>
  );
};

export default Pagination;
