import { createPortal } from "react-dom";
import useBookmarksContext from "../lib/hooks/useBookmarksContext";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext()

  return createPortal(
    <div className="bookmarks-popover">
    <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
  </div>, document.body
  )
}