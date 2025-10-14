import { useEffect, useState } from "react";
import "./Dashboard.css";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Navbar from "./Navbar";

export interface Isubscriptions {
  id: number;
  user_id: string;
  package: string;
  expires_on: string;
}
export interface IusersData {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  active: string;
  address: string;
  country: string;
  join_date: string;
}
const Dashboard = () => {
  const [subscribers, setSubscribers] = useState<Isubscriptions[]>([]);
  const [filteredSubs, setFilteredSubs] = useState<Isubscriptions[]>([]);
  const [sortField, setSortField] = useState<keyof Isubscriptions | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<IusersData>();
  const [filterPackage, setFilterPackage] = useState<string>(""); 
  const [filterDate, setFilterDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubs.slice(indexOfFirstItem, indexOfLastItem);

  const handleView = async (id: string) => {
    try {
      const response = await fetch("/users.json");
      if (!response.ok) throw new Error("Failed to fetch user details");
      const allUsers: IusersData[] = await response.json();
      const user = allUsers.find((u) => String(u.id) === id);
      setSelectedUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (field: keyof Isubscriptions) => {
    const isAsc = sortField === field && sortOrder === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    const sorted = [...filteredSubs].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      let aCompare: string | number = aValue;
      let bCompare: string | number = bValue;

      if (field === "user_id" || field === "id") {
        aCompare = Number(aValue);
        bCompare = Number(bValue);
      }

      if (field === "expires_on") {
        aCompare = new Date(aValue as string).getTime();
        bCompare = new Date(bValue as string).getTime();
      }

      if (aCompare < bCompare) return newOrder === "asc" ? -1 : 1;
      if (aCompare > bCompare) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredSubs(sorted);
    setCurrentPage(1);
  };

  useEffect(() => {
    let filtered = [...subscribers];
    if (filterPackage) {
      filtered = filtered.filter(
        (sub) => sub.package.toLowerCase() === filterPackage.toLowerCase()
      );
    }

    if (filterDate) {
      const filterTime = new Date(filterDate).getTime();
      filtered = filtered.filter(
        (sub) => new Date(sub.expires_on).getTime() <= filterTime
      );
    }

    setFilteredSubs(filtered);
    setCurrentPage(1);
  }, [filterPackage, filterDate, subscribers]);

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const response = await fetch("/subscribers.json");
        if (!response.ok) throw new Error("Failed to fetch subscribers");
        const data: Isubscriptions[] = await response.json();
        setSubscribers(data);
        setFilteredSubs(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadSubscribers();
  }, []);
  return (
    <>
    <Navbar/>
     <div className="dashboard-wrapper">
      <h2 style={{textAlign:"center"}}>Subscribers Data</h2>
      <div>Total Subscribers: {subscribers.length}</div>
      <Filter
        filterPackage={filterPackage}
        setFilterPackage={setFilterPackage}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      
      />

      <Table
        data={currentItems}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
      />
      <Pagination
        currentPage={currentPage}
        filteredSubs={filteredSubs}
        setCurrentPage={setCurrentPage}
      />

      {selectedUser && (
        <Modal onClose={() => setSelectedUser(undefined)} user={selectedUser} />
      )}
      </div>
    </>
  );
};
export default Dashboard;
