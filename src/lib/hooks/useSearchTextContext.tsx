import { useContext } from 'react'
import { SearchTextContext } from '../../contexts/SearchTextContextProvider'

export default function useSearchTextContext() {
  const context = useContext(SearchTextContext)

  if (!context) {
    throw new Error("useSearchTextContext must be used within SeachTextContextProvider")
  }

  return context
}
