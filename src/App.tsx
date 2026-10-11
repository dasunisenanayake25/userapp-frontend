import {use, useState} from "react";
import UserForm from "./components/UserForm";   
import UserItem from "./components/UserItem";
import {getUsers} from "./api/userApi";
import type { User, UserRequest } from './types/user';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = async () => {
    try {
      setError(null);
      setUsers(await getUsers());
    } catch (e) {
      setError((e instanceof Error) ? e.message : "Something went wrong");
    }
  };

  const handleAdd = (data: UserRequest) => {
    const newUser: User={ id: Date.now(), ...data, status: "Active" };
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onSubmit={handleAdd} />
      <button onClick={handleLoad}>Load Users</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          {users.map(u => (
            <UserItem key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}