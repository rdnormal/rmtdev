import { SortBy } from "../lib/types";

type SortingControlProps = {
  onClick: (newSortBy: SortBy) => void,
  sortBy: SortBy
}

export default function SortingControls({ onClick, sortBy }: SortingControlProps) {

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton onClick={() => onClick("relevant")} isActive={sortBy === "relevant"} sortBy={sortBy}>Relevant</SortingButton>
      <SortingButton onClick={() => onClick("recent")} isActive={sortBy === "recent"} sortBy={sortBy}>Recent</SortingButton>
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