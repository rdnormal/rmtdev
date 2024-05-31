import { useContext } from 'react'
import { ActiveIdContext } from '../../contexts/ActiveIdContextProvider';

export default function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error("useActiveIdContext must be used within ActiveIdContext")
  }

  return context
}
