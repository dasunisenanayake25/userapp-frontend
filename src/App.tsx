import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import type { User, UserRequest } from "./types/user";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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

  const handleSubmit = async (data: UserRequest) => {
    if (editingUser) {
      const updated = await updateUser(editingUser.id, data);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setEditingUser(null);
    } else {
      const created = await createUser(data);
      setUsers((prev) => [...prev, created]);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (editingUser?.id === id) setEditingUser(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm
        key={editingUser?.id ?? "new"}
        editingUser={editingUser}
        onSubmit={handleSubmit}
        onCancel={() => setEditingUser(null)}
      />
      <UserList
        users={users}
        loading={loading}
        error={error}
        onEdit={setEditingUser}
        onDelete={handleDelete}
      />
    </div>
  );
}