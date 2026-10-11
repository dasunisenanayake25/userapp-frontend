import UserItem from "./UserItem";
import type { User } from "../types/user";
import { useUsers } from "../hooks/useUsers";

interface UserListProps {
  onEdit: (user: User) => void;
}

export default function UserList({ onEdit }: UserListProps) {
  const { users, loading, error, removeUser } = useUsers();

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await removeUser(id);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  if (loading) return <p className="muted">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (users.length === 0) return <p className="muted">No users yet.</p>;

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserItem key={u.id} user={u} onEdit={onEdit} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}