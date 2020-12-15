import User from "../models/User";
export interface registerData {
  name: string;
  email: string;
  password1: string;
  password2: string;
}
export interface newTodo {
  title: string;
  description: string;
}

export interface loginData {
  email: string;
  password: string;
}

export interface globalState {
  user: User | null;
}

export interface action {
  type: string;
  payload?: any;
}
