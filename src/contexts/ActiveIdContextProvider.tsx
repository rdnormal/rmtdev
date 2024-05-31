import { createContext } from "react"
import useActiveId from "../lib/hooks/useActiveId"

type TContextValue = {
  activeId: number | null,
}

export const ActiveIdContext = createContext<null | TContextValue>(null)

export default function ActiveIdContextProvider({ children }: { children: React.ReactNode }) {
  const activeId = useActiveId()

  const contextValue = {
    activeId
  }
  
  return (
    <ActiveIdContext.Provider value={contextValue}>{children}</ActiveIdContext.Provider>
  )
}
