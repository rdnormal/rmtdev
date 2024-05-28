type ResultsCountProps = {
  totalNumOfResults: number;
}

export default function ResultsCount({totalNumOfResults}: ResultsCountProps) {
  return <p className="count"><span className="u-bold">{totalNumOfResults}</span> results</p>;
}
