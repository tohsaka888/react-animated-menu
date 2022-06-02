import { createContext, MutableRefObject } from "react";
import { MenuContextProps } from "./type";

export const MenuContext = createContext<MenuContextProps | null>(null)
export const ActiveItemContext = createContext<MutableRefObject<HTMLDivElement> | null>(null)