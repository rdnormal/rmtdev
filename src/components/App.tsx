import { useState } from "react";
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
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/consts";

function App() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearch = useDebounce(searchText, 500)
  const { jobItems, isLoading } = useJobItems(debouncedSearch)
  const [currentPage, setCurrentPage] = useState(1)

  const jobItemSliced = jobItems?.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE) || [];
  const totalNumOfResults = jobItems?.length || 0;
  const totalNumOfPages = totalNumOfResults / RESULTS_PER_PAGE;

  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage(prev => prev + 1)
    } else if (direction === "previous") {
      setCurrentPage(prev => prev - 1)
    }
  }

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

        <JobList jobItems={jobItemSliced} isLoading={isLoading} />

        <PaginationControls onClick={handleChangePage} currentPage={currentPage} totalNumOfPages={totalNumOfPages}/>
      </Sidebar>

      <JobItemContent />
    </Container>

    <Footer />
    <Toaster position="top-right" />
  </>;
}

export default App;
