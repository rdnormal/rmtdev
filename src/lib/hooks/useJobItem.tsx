import { useEffect, useState } from "react"
import { BASE_API_URL } from "../consts"
import { TJobItemExpanded } from "../types"

export default function useJobItem(id: number | null) {
  const [activeJobItem, setActiveJobItem] = useState<TJobItemExpanded | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchJobDetails = async (id: number) => {
    setIsLoading(true)
    const res = await fetch(`${BASE_API_URL}/${id}`)
    const data = await res.json()
    setActiveJobItem(data.jobItem)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!id) return
    fetchJobDetails(id);
  }, [id])

  return [activeJobItem, isLoading] as const
}
