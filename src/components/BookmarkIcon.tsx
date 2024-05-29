import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import useBookmarksContext from "../lib/hooks/useBookmarksContext";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext()
  return (
    <button className="bookmark-btn" onClick={(e) => {
      handleToggleBookmark(id);
      e.stopPropagation();
      e.preventDefault();
    }}>
      <BookmarkFilledIcon className={`${bookmarkedIds.includes(id) && "filled"}`} />
    </button>
  );
}
