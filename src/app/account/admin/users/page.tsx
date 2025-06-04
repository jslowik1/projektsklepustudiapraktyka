"use client";

import Spinner from "@/app/components/inputs/Spinner";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, seUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function fetchUsers() {
    setIsLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();

    setIsLoading(false);
    seUsers(data);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="products">
      <div className="buttons">
        <button>
          <CgAdd size={20} />
          Dodaj przedmiot
        </button>
      </div>
      <div>
        {isLoading ? <Spinner size={30} /> : null}
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
