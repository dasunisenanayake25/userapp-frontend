import {useState} from "react";
import UserForm from "./components/UserForm";   
import UserItem from "./components/UserItem";
import type { User, UserRequest } from './types/user';

const fakeUsers: User[] = [
  {id:1, fullName: "Dasuni Senanayake", email: "dasuni123@gmail.com", status: "Active"},
  {id:2, fullName: "Manuthi Kasuntha", email: "manuthi456@gmail.com", status: "Inactive"},
  {id:3, fullName: "Ravindu Anushka", email: "ravindu789@gmail.com", status: "Active"},
  {id:4, fullName: "Chalindu Kalhara", email: "chalindu012@gmail.com", status: "Inactive"}
];

export default function App() {
  const [users, setUsers] = useState<User[]>(fakeUsers);

  const handleAdd = (user: UserRequest) => {
    const newUser: User={ id: Date.now(), ...user, status: "Active" };
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onSubmit={handleAdd} />
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