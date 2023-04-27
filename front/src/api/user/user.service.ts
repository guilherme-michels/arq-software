import { userAPI } from "../index";

interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export function addUser(user: Omit<User, "id">) {
  return userAPI.post<User>("/register", user).then((res) => res.data);
}

export function validadeLoginUser(user: loginUser) {
  return userAPI.post<loginUser>("/login", user).then((res) => res.data);
}
