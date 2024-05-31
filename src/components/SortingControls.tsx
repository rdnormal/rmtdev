import useJobItemsContext from "../lib/hooks/useJobItemsContext";
import { SortBy } from "../lib/types";

export default function SortingControls() {
  const {sortBy, handleChangeSortBy} = useJobItemsContext()
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton onClick={() => handleChangeSortBy("relevant")} isActive={sortBy === "relevant"} sortBy={sortBy}>Relevant</SortingButton>
      <SortingButton onClick={() => handleChangeSortBy("recent")} isActive={sortBy === "recent"} sortBy={sortBy}>Recent</SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode
  sortBy: SortBy
}

function SortingButton({ onClick, isActive, children, sortBy }: SortingButtonProps) {
  const isRelevant = sortBy === "relevant"
  return (
    <button className={`sorting__button sorting__button--${isRelevant ? "relevant" : "recent"} ${isActive && "sorting__button--active"}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}