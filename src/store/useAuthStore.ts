import { create } from "zustand";
import { loginType } from "@/schema/auth";

const INITIAL_USER = [
  {
    email: 'admin@gmail.com',
    password: 'password', // secara nyata ini harus di hash
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
    // Cari user yang match email dan passwordnya
    const userFound = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (userFound) {
      set({ isLoggedIn: true, user: { email: userFound.email } });
      return true; // Berhasil login
    }
    
    return false; // Gagal login
  },

  register: (data: loginType) => {
    const { users } = get();
    // Cek apakah email sudah terdaftar
    const userExists = users.some((u) => u.email === data.email);
    if (userExists) {
      return false; // Email sudah digunakan
    }

    // Tambahkan user baru
    set({ users: [...users, data] });
    return true; // Berhasil mendaftar
  },

  logout: () => {
    set({ isLoggedIn: false, user: null });
  },
}));
