import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Buffer} from 'buffer'
import { Felt } from "./types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");



export function feltToString(felt: any) {
    const newStrB = Buffer.from(felt.toString(16), 'hex')
    return newStrB.toString()
}
  
export function stringToFelt(str: string) {
    return "0x" + Buffer.from(str).toString('hex')
}
  