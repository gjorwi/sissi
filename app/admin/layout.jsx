'use client'
import Link from "next/link";
import "../globals.css";
import BtnLogOut from "@/components/buttons/bntLogOut";
import { IoChevronBackSharp } from "react-icons/io5";
import { usePathname,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {getStoragedUserDat,removeStoragedUserDat} from "@/utils/utilidades";

export default function RootLayout({ children }) {
  var path=usePathname()
  const [userDat,setUserDat]=useState('')
  const [split,setSplit]=useState([])
  const [pathShow,setPathShow]=useState([])
  const router = useRouter();

  useEffect(() => {
    const userDatTemp=getStoragedUserDat("userDat")
    setUserDat(userDatTemp)
    // Verificar si el token de seguridad es válido
    if (!userDatTemp || !userDatTemp?.token) {
      // Redirigir al usuario a la página de inicio de sesión
      router.replace("/");
    }
    var splitPath=path.split('/').filter((items)=> items!='')
    setPathShow(splitPath)
    setSplit(splitPath)
  }, [path])

  const LogOut =()=>{
    removeStoragedUserDat('userDat')
    router.replace("/");
  }

  return (
    <main className="w-full">
      <header className="relative h-[6vh] w-full flex justify-center items-center bg-cyan-500">
        {split.length>1 &&
          <div className="absolute left-0 flex text-white ml-6 text-2xl">
            <Link href={'/admin'} className="flex justify-center items-center">
              <IoChevronBackSharp className="cursor-pointer"></IoChevronBackSharp ><span className="text-sm sm:flex hidden">DASHBOAR</span>
            </Link>
          </div>
        }
        <div className="uppercase text-white">
          {pathShow[1]}
        </div>
        <div className="absolute right-0 text-white mr-6 mt-1">
          <BtnLogOut LogOut={LogOut}></BtnLogOut>
        </div>
      </header>
      <div className="flex justify-center text-sm font-light ">
        <p className="w-10/12 text-center">
          Hola <span className="uppercase pl-1 text-black font-semibold">{userDat.usuUserName}</span>, Bienvenido al modulo de configuración.
        </p>
      </div>
      {children}
    </main>
  );
}
