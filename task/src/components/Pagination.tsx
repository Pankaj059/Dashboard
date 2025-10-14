import type { Isubscriptions } from "../pages/dashboard";

interface IPagination {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  filteredSubs: Isubscriptions[];
}
const Pagination = ({
  setCurrentPage,
  filteredSubs,
  currentPage,
}: IPagination) => {
  const itemsPerPage = 10;
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {Math.ceil(filteredSubs.length / itemsPerPage)}
      </span>
      <button
        onClick={() =>
          setCurrentPage((prev) =>
            prev < Math.ceil(filteredSubs.length / itemsPerPage)
              ? prev + 1
              : prev
          )
        }
        disabled={currentPage >= Math.ceil(filteredSubs.length / itemsPerPage)}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination
