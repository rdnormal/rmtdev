import { TJobItem } from "../types";
import { useQuery } from "@tanstack/react-query";
import { handleErrors } from "../utils";

type JobItemsApiResponse = {
  public: boolean,
  sorted: boolean,
  jobItems: TJobItem[]
}

const fetchData = async (searchText: string): Promise<JobItemsApiResponse> => {
  const res = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.description)
  }
  const data = await res.json();
  return data;
}

export default function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(['job-items', searchText], () => (searchText ? fetchData(searchText) : null), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
    onError: handleErrors
  })


  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading
  } as const
}
