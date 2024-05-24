import useActiveId from "../lib/hooks/useActiveId";
import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: TJobItem[],
  isLoading: boolean
}


export function JobList({jobItems, isLoading}: JobListProps) {
  const activeId = useActiveId();

  return <ul className="job-list">
    {isLoading && <Spinner />}
    {!isLoading && jobItems.map(item => (<JobListItem key={item.id} jobItem={item} isActive={item.id === activeId}/>))}
  </ul>;
}

export default JobList;
