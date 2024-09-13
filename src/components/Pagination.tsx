import { cn } from "../utils/cn";

interface PaginationProps {
  pages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  pages,
  currentPage,
  onChange,
}: PaginationProps) => {
  return (
    <div className="space-x-2">
      {Array.from({ length: pages ?? 0 }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          disabled={currentPage === index + 1}
          className={cn("px-3 py-2 rounded-md bg-slate-600 text-gray-50", {
            "bg-slate-400": currentPage === index + 1,
          })}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
