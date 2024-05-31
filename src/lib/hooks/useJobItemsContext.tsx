import { useContext } from 'react'
import { JobItemsContext } from '../../contexts/JobItemsContextProvider'

export default function useJobItemsContext() {
  const context = useContext(JobItemsContext)

  if (!context) {
    throw new Error("useJobItemsContext must be used within SeachTextContextProvider")
  }

  return context
}
