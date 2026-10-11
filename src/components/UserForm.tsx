import { useState } from "react";
import type { FormEvent } from "react";
import type { UserRequest } from "../types/user";

interface UserFormProps {
  onSubmit: (data: UserRequest) => Promise<void>;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ fullName, email });
      setFullName("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add user</h2>
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
        {submitting ? "Saving..." : "Create"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}