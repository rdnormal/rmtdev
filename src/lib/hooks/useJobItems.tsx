import { useEffect, useState } from "react";
import { TJobItem } from "../types";

export default function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const jobItemSliced = jobItems.slice(0, 7);
  const totalNumOfResults = jobItems.length;

  const fetchData = async () => {
    setIsLoading(true)
    const res = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
    const data = await res.json();
    setJobItems(data.jobItems)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!searchText) return;
    fetchData();
  }, [searchText])

  return {jobItemSliced,
    isLoading, totalNumOfResults} as const
}
