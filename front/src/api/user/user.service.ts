import { userAPI } from "../index";

export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export function register(user: Omit<User, "id">) {
  return userAPI.post<User>("/register", user).then((res) => res.data);
}

export function login(user: LoginPayload) {
  return userAPI.post<LoginResponse>("/login", user).then((res) => res.data);
}
