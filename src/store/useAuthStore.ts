import { create } from "zustand";
import { loginType } from "@/schema/auth";

const INITIAL_USER = [
  {
    email: 'admin@gmail.com',
    password: 'password', 
  },
];

type AuthStore = {
  isLoggedIn: boolean;
  user: { email: string } | null;
  users: loginType[];
  login: (data: loginType) => boolean;
  logout: () => void;
  register: (data: loginType) => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  users: INITIAL_USER,

  login: (data: loginType) => {
    const { users } = get();
    const userFound = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (userFound) {
      set({ isLoggedIn: true, user: { email: userFound.email } });
      return true; 
    }
    
    return false; 
  },

  register: (data: loginType) => {
    const { users } = get();
    
    const userExists = users.some((u) => u.email === data.email);
    if (userExists) {
      return false;
    }

    // Tambahkan user baru
    set({ users: [...users, data] });
    return true; 
  },

  logout: () => {
    set({ isLoggedIn: false, user: null });
  },
}));
