import { useState } from "react";
import type { FormEvent } from "react";
import type { User } from "../types/user";
import { useUsers } from "../hooks/useUsers";

interface UserFormProps {
  editingUser: User | null;
  onDone: () => void;
}

export default function UserForm({ editingUser, onDone }: UserFormProps) {
  const { addUser, editUser } = useUsers();
  const [fullName, setFullName] = useState(editingUser?.fullName ?? "");
  const [email, setEmail] = useState(editingUser?.email ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (editingUser) {
        await editUser(editingUser.id, { fullName, email });
      } else {
        await addUser({ fullName, email });
      }
      setFullName("");
      setEmail("");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? `Edit user #${editingUser.id}` : "Add user"}</h2>
      <input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : editingUser ? "Update" : "Create"}
      </button>
      {editingUser && (
        <button type="button" onClick={onDone}>
          Cancel
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}