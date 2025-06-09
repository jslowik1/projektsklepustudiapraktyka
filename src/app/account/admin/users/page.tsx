"use client";

import Spinner from "@/app/components/inputs/Spinner";
import { useGetUsers } from "@/hooks/query/useGetUsers";
import { useEffect, useState } from "react";
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
          ? users.map((user) => {
            return <p key={user.id}>{user.email}</p>;
          })
          : null}
      </div>
    </div>
  );
};

export default Page;
