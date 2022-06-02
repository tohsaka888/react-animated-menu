import React from "react";
import { SpringConfig } from "react-spring";

export type MenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  key: React.Key;
}

export type MenuProps = {
  items: MenuItemProps[];
  defaultSelectedKeys?: string[];
  onSelect?: () => void;
}

export type MenuContextProps = {
  activeKeys: React.Key[];
  setActiveKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
}

export type CommonProps = {
  itemStyle?: React.CSSProperties;
  underlineStyle?: React.CSSProperties; 
  config?: SpringConfig
}
