import { createContext } from "react";
import { MenuContextProps } from "./type";

export const MenuContext = createContext<MenuContextProps | null>(null)