import useJobItemsContext from "../lib/hooks/useJobItemsContext";

export default function ResultsCount() {
  const {totalNumOfResults} = useJobItemsContext()
  return <p className="count"><span className="u-bold">{totalNumOfResults}</span> results</p>;
}
