import { BASE_API_URL } from "../consts"
import { useQuery } from "@tanstack/react-query"
import { TJobItemExpanded } from "../types";
import { handleErrors } from "../utils";

type JobItemApiResponse = {
  public: boolean,
  jobItem: TJobItemExpanded
};

export const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${id}`)
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description) 
  }
  const data = await res.json()
  return data;
}

export default function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(['job-item', id], () => (id ? fetchJobItem(id) : null), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id),
    onError: handleErrors
  })

  return {
    jobItem: data?.jobItem,
    isLoading: isInitialLoading
  } as const
}
