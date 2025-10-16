"use client";

import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  children?: ReactNode;
  className?: string;
}

export const Button = ({ className, text }: ButtonProps) => {
  return <button className={className}>{text}</button>;
};
