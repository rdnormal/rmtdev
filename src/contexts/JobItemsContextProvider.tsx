import { createContext, useCallback, useMemo, useState } from "react"
import { RESULTS_PER_PAGE } from "../lib/consts"
import useSearchQuery from "../lib/hooks/useSearchQuery"
import { SortBy, PageDirection, TJobItem } from "../lib/types"
import useSearchTextContext from "../lib/hooks/useSearchTextContext"

type TContextValue = {
  totalNumOfResults: number,
  handleChangeSortBy: (newSortBy: SortBy) => void,
  sortBy: SortBy,
  jobItemsSortedAndSliced: TJobItem[],
  isLoading: boolean,
  handleChangePage: (direction: PageDirection) => void,
  currentPage: number,
  totalNumOfPages: number,
  jobItems: TJobItem[] | undefined
}

export const JobItemsContext = createContext<null | TContextValue>(null)

export default function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
  const { debouncedSearch } = useSearchTextContext()
  const { jobItems, isLoading } = useSearchQuery(debouncedSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortBy>("relevant")

  const jobItemSorted = useMemo(() => [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo
    }
  }), [jobItems, sortBy])

  const jobItemsSortedAndSliced = useMemo(() => jobItemSorted?.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE),
    [currentPage, jobItemSorted]);
  const totalNumOfResults = jobItems?.length || 0;
  const totalNumOfPages = totalNumOfResults / RESULTS_PER_PAGE;

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage(prev => prev + 1)
    } else if (direction === "previous") {
      setCurrentPage(prev => prev - 1)
    }
  }, [])

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1)
    setSortBy(newSortBy)
  },[])


  const contextValue = useMemo(() => ({
    totalNumOfResults,
    handleChangeSortBy,
    sortBy,
    jobItemsSortedAndSliced,
    isLoading,
    handleChangePage,
    currentPage,
    totalNumOfPages,
    jobItems
  }), [
    totalNumOfResults,
    handleChangeSortBy,
    sortBy,
    jobItemsSortedAndSliced,
    isLoading,
    handleChangePage,
    currentPage,
    totalNumOfPages,
    jobItems
  ])

  return (
    <JobItemsContext.Provider value={contextValue}>{children}</JobItemsContext.Provider>
  )
}