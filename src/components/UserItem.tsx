import type { User } from '../types/user';

interface UserItemProps {
  user: User;
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
