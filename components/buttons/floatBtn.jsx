import Link from "next/link";
import "@/app/globals.css";
import { IoMdAdd } from "react-icons/io";

export default function FloatBtn(){
  
  return(
    <Link href={'/home/new'}>
      <button className="fixed bottom-4 right-4 bg-cyan-500 text-white h-14 w-14 text-2xl rounded-full flex justify-center items-center">
          <IoMdAdd/>
      </button>
    </Link>
  )
}