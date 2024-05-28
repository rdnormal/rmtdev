import {  useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import useJobItems from "../lib/hooks/useJobItems";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import useDebounce from "../lib/hooks/useDebounce";

function App() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearch = useDebounce(searchText, 500)
  const {jobItemSliced: jobItems, isLoading, totalNumOfResults} = useJobItems(debouncedSearch)


  return <>
    <Background />

    <Header>
      <HeaderTop />
      <SearchForm searchText={searchText} setSearchText={setSearchText} />
    </Header>

    <Container>
      <Sidebar>
        <SidebarTop>
          <ResultsCount totalNumOfResults={totalNumOfResults} />
          <SortingControls />
        </SidebarTop>

        <JobList jobItems={jobItems} isLoading={isLoading} />
        <PaginationControls />
      </Sidebar>

      <JobItemContent />
    </Container>

    <Footer />
  </>;
}

export default App;
