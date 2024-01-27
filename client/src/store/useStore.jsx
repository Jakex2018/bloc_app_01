import { create } from "zustand";
import { Profile } from "../assets";

export const useStoreTheme = create((set) => ({
  user: JSON.parse(
    localStorage.getItem({
      token: "123",
      user: {
        image: Profile,
        name: "Armando Sanchez",
      },
    })
  ),
  isLoading: false,
  theme: localStorage.getItem("theme") ?? "light",
  ///signin: (data)=> set((state)=>({user:data})),
  setTheme: (value) => set({ theme: value }),
  setisLoading:(val)=>set(()=>({isLoading:val})),
  signOut:()=>set({user:{}}),
}));
