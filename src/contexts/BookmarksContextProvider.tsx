import { createContext } from "react"
import useLocalStorage from "../lib/hooks/useLocalStorage"
import useJobItems from "../lib/hooks/useJobItems"
import { TJobItemExpanded } from "../lib/types"

type TContextValue = {
  bookmarkedIds: number[],
  handleToggleBookmark: (id: number) => void,
  bookmarkedJobItems: TJobItemExpanded[],
  isLoading: boolean
}

export const BookmarksContext = createContext<null | TContextValue>(null)

export default function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>("bookmarkIds", [])

  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds)

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter(item => item !== id))
    } else {
      setBookmarkedIds((prev) => [...prev, id])
    }
  }

  const contextValue = {
    bookmarkedIds,
    handleToggleBookmark,
    bookmarkedJobItems,
    isLoading
  }

  return (
    <BookmarksContext.Provider value={contextValue}>{children}</BookmarksContext.Provider>
  )
}
