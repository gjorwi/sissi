'use client'
import Link from "next/link";
import "../../globals.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  var path=usePathname()
  const [split,setSplit]=useState([])

  useEffect(() => {
    var splitPath=path.split('/').filter((items)=> items!='')
    setSplit(splitPath)
  }, [path])

  return (
    <main>
      <header className="flex justify-center items-center mt-2">
        {split.length>2 &&
          <Link href={'/admin/usuarios'} className="bg-cyan-500 p-2 flex justify-center items-center rounded-lg text-white">
            <IoChevronBackSharp className="cursor-pointer"></IoChevronBackSharp >Atras
          </Link>
        }
      </header>
      {children}
    </main>
  );
}
