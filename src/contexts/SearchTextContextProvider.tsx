import { createContext, useState } from "react"
import useDebounce from "../lib/hooks/useDebounce"

type TContextValue = {
  searchText: string,
  debouncedSearch: string,
  handleChangeSearchText: (newSearchText: string) => void
}

export const SearchTextContext = createContext<null | TContextValue>(null)

export default function SearchTextContextProvider({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState("")
  const debouncedSearch = useDebounce(searchText, 500)

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText)
  }

    const contextValue = {
      searchText,
      debouncedSearch,
      handleChangeSearchText
    }

    return (
      <SearchTextContext.Provider value={contextValue}>{children}</SearchTextContext.Provider>
    )
  }