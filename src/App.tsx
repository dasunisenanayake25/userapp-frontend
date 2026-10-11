import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import UserForm from "./components/UserForm";
import { getUsers, createUser } from "./api/userApi";
import type { User, UserRequest } from "./types/user";

export default function App() {
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

 const handleAdd = async (data: UserRequest) => {
  const created = await createUser(data);
  setUsers((prev) => [...prev, created]);
};

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onSubmit={handleAdd} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <UserItem key={u.id} user={u} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}