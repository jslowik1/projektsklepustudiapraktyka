"use client";

import Spinner from "@/app/components/inputs/Spinner";
import { useGetUsers } from "@/hooks/query/useGetUsers";
import { useEffect, useState } from "react";
import "../products/table.scss";
const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);

  const usersQuery = useGetUsers();

  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data);
    }
  }, [usersQuery.data, usersQuery.status])
  return (
    <div className="products">
      <div>
        {usersQuery.isLoading ? <Spinner size={30} /> : null}
        {users && users.length
          ? <table className="items-table">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Imię i nazwisko</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {users.map((user) => {
                return <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.displayName}</td>
                </tr>;
              })}
            </tbody>
          </table>
          : null}
      </div>
    </div>
  );
};

export default Page;
