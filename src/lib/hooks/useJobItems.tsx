import { useQueries } from "@tanstack/react-query"
import { fetchJobItem } from "./useJobItem"
import { handleErrors } from "../utils"
import { TJobItemExpanded } from "../types";

export default function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map(id => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleErrors
    }))
  })

  const jobItems = results.map(item => item.data?.jobItem).filter(jobItem => jobItem !== undefined) as TJobItemExpanded[];
  const isLoading = results.some(res => res.isLoading);

  return { jobItems, isLoading }
}
