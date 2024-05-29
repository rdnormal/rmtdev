import { useContext } from "react"
import { BookmarksContext } from "../../contexts/BookmarksContextProvider"

export default function useBookmarksContext() {
  const context = useContext(BookmarksContext)

  if (!context) {
    throw new Error("context not wrapped")
  }

  const {
    bookmarkedIds,
    handleToggleBookmark
  } = context

  return {
    bookmarkedIds,
    handleToggleBookmark
  }
}
