interface IFilterProps {
  filterPackage: string;
  setFilterPackage: (value: string) => void;
  filterDate: string;
  setFilterDate: (value: string) => void;
}
const packageOptions = [
  "ALL",
  "Plan 1",
  "Plan 2",
  "Plan3",
  "Plan 6",
  "Plan 12",
  "Plan Unlimited",
];

const Filter = ({
  filterPackage,
  setFilterPackage,
  filterDate,
  setFilterDate,
}: IFilterProps) => {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="package">Package</label>
        <select
          id="package"
          value={filterPackage}
          onChange={(e) => setFilterPackage(e.target.value)}
        >
          {packageOptions.map((pkg) => (
            <option key={pkg} value={pkg}>
              {pkg || "ALL"}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="expiry">Expiry Date (before):</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ marginLeft: "8px", padding: "6px", borderRadius: "4px" }}
        />
      </div>

      <div className="filter-group">
        <button
          className="clear-filter-button"
          onClick={() => {
            setFilterPackage("");
            setFilterDate("");
          }}
          style={{ marginTop: "24px" }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
export default Filter;
