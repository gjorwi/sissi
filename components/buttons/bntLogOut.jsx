import Link from "next/link";
import "@/app/globals.css";
import { MdLogout } from "react-icons/md";

export default function BtnLogOut({LogOut}){
  
  return(
    <button onClick={LogOut} className="text-2xl">
      <MdLogout />
    </button>
  )
}