import type { User } from "../types/user";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserItem({ user, onEdit, onDelete }: UserItemProps) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>
        <span className="badge">{user.status}</span>
      </td>
      <td>
        <div className="actions">
          <button type="button" onClick={() => onEdit(user)}>
            Edit
          </button>
          <button type="button" className="danger" onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}