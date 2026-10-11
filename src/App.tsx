import { useState } from "react";
import { UserProvider } from "./context/UserProvider";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import type { User } from "./types/user";

export default function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <UserProvider>
      <h1>User Management</h1>
      <UserForm
        key={editingUser?.id ?? "new"}
        editingUser={editingUser}
        onDone={() => setEditingUser(null)}
      />
      <UserList onEdit={setEditingUser} />
    </UserProvider>
  );
}