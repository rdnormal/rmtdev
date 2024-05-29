import { createContext, useEffect, useState } from "react"

type TContextValue = {
  bookmarkedIds: number[],
  handleToggleBookmark: (id: number) => void
}

export const BookmarksContext = createContext<null | TContextValue>(null)

export default function BookmarksContextProvider({children} : {children: React.ReactNode}) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => JSON.parse(localStorage.getItem("bookmarkedIds") || "[]"))

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter(item => item !== id))
    } else {
      setBookmarkedIds((prev) => [...prev, id])
    }
  }

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  const contextValue = {
    bookmarkedIds,
    handleToggleBookmark
  }

  return (
    <BookmarksContext.Provider value={contextValue}>{children}</BookmarksContext.Provider>
  )
}
