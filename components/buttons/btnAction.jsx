'use client'
import Link from "next/link";
import "@/app/globals.css";
import { MdLogout } from "react-icons/md";

export default function BtnAction({label,className,type,disabled}){
  
  return(
    // <div >
      <button type={type} disabled={disabled} className={'cursor-pointer py-2 border flex text-sm flex-col justify-center items-center text-slate-800 bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1)] hover:shadow-none border-b-2 border-cyan-600 hover:border hover:border-b-2 hover:border-slate-300 rounded-lg '+className}>
        {label}
      </button>
    // </div>
  )
}