import type { User, UserRequest } from "../types/user";

const BASE_URL = "/api/users";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T; 
  return res.json() as Promise<T>;
}

export const getUsers = () => request<User[]>(BASE_URL);

export const createUser = (data: UserRequest) =>
  request<User>(BASE_URL, { method: "POST", body: JSON.stringify(data) });

export const updateUser = (id: number, data: UserRequest) =>
  request<User>(`${BASE_URL}/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteUser = (id: number) =>
  request<void>(`${BASE_URL}/${id}`, { method: "DELETE" });