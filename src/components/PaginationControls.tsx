import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlProps = {
  onClick: (direction: "next" | "previous") => void,
  currentPage: number,
  totalNumOfPages: number
}

export default function PaginationControls({ onClick, currentPage, totalNumOfPages }: PaginationControlProps) {

  return <section className="pagination">
    {currentPage > 1 && <PaginationButton direction="previous" currentPage={currentPage} onClick={() => onClick("previous")} />}
    {currentPage < totalNumOfPages && <PaginationButton direction="next" currentPage={currentPage} onClick={() => onClick("next")} />}
  </section>;
}

type PaginationButtonProps = {
  direction: "next" | "previous",
  currentPage: number,
  onClick: () => void
}

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}>
      {direction === "previous" && (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1} <ArrowRightIcon />
        </>
      )}
    </button>
  )
}