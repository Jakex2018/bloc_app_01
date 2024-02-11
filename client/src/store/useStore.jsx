import { create } from "zustand";

export const useStoreTheme = create((set) => ({
  user: JSON.parse(localStorage.getItem("userInfo"))|| {},
  isLoading: false,
  theme: localStorage.getItem("theme") ?? "light",
  signIn: (data)=> set((state)=>({user:data})),
  setTheme: (value) => set({ theme: value }),
  setisLoading: (val) => set(() => ({ isLoading: val })),
  signOut: () => set({ user: {} }),
}));
