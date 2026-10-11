import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}