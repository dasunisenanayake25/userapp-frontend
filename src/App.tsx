import UserItem from "./components/UserItem";
import type { User } from './types/user';

const fakeUsers: User[] = [
  {id:1, fullName: "Dasuni Senanayake", email: "dasuni123@gmail.com", status: "Active"},
  {id:2, fullName: "Manuthi Kasuntha", email: "manuthi456@gmail.com", status: "Inactive"},
  {id:3, fullName: "Ravindu Anushka", email: "ravindu789@gmail.com", status: "Active"},
  {id:4, fullName: "Chalindu Kalhara", email: "chalindu012@gmail.com", status: "Inactive"}
];

export default function App() {
  return (
    <div>
      <h1>User Management</h1>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fakeUsers.map(u => (
            <UserItem key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}