import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2) // max 2 letters
    .join("")
    .toUpperCase()
}
