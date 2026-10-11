import UserItem from "./UserItem";
import type { User } from "../types/user";

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, loading, error, onEdit, onDelete }: UserListProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (users.length === 0) return <p>No users yet.</p>;

  return (
    <table border={1} cellPadding={6}>
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
          <UserItem key={u.id} user={u} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}