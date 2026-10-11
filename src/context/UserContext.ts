import { createContext } from "react";
import type { User, UserRequest } from "../types/user";

export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (data: UserRequest) => Promise<void>;
  editUser: (id: number, data: UserRequest) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);