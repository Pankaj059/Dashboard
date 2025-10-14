import type { Isubscriptions } from "../pages/dashboard";

interface ITable {
  data: Isubscriptions[];
  onSort: (field: keyof Isubscriptions) => void;
  sortField: keyof Isubscriptions | "";
  sortOrder: "asc" | "desc";
  onView: (userId: string) => void;
}
const Table = ({ data, onSort, sortField, sortOrder, onView }: ITable) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th onClick={() => onSort("user_id")}>
            User Id
            {sortField === "user_id" && (
              <span className="sort-icon">
                {sortOrder === "asc" ? "⬇" : "⬆"}
              </span>
            )}
          </th>
          <th onClick={() => onSort("package")}>
            Package
            {sortField === "package" && (
              <span className="sort-icon">
                {sortOrder === "asc" ? "⬇" : "⬆"}
              </span>
            )}
          </th>
          <th onClick={() => onSort("expires_on")}>
            Expiries On
            {sortField === "expires_on" && (
              <span className="sort-icon">
                {sortOrder === "asc" ? "⬇" : "⬆"}
              </span>
            )}
          </th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {data.map((subs) => (
          <tr key={subs.id}>
            <td>{subs.user_id}</td>
            <td>{subs.package}</td>
            <td>{subs.expires_on}</td>
            <td>
              <button onClick={() => onView(subs.user_id)}>⏿</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
