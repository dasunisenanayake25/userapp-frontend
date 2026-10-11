import type { User } from "../types/user";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserItem({ user }: UserItemProps) {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
        </tr>
    );
}