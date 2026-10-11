import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import type { User, UserRequest } from "../types/user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setUsers(await getUsers());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const addUser = async (data: UserRequest) => {
    const created = await createUser(data);
    setUsers((prev) => [...prev, created]);
  };

  const editUser = async (id: number, data: UserRequest) => {
    const updated = await updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const removeUser = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <UserContext.Provider
      value={{ users, loading, error, addUser, editUser, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
}