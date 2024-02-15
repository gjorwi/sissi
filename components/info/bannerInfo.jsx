'use client'
import "@/app/globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {getStoragedUserDat} from "@/utils/utilidades";

export default function BannerInfo({LogOut}){
  var path=usePathname()
  const [userDat,setUserDat]=useState('')
  const [presentacion,setPresentacion]=useState('')
  useEffect(() => {
    const userDatTemp=getStoragedUserDat("userDat")
    setUserDat(userDatTemp)
    const tempPresent=path.includes('home')?'sistema de solicitudes':path.includes('admin')?'modulo de configuración':''
    setPresentacion(tempPresent)
  }, [])
  return(
    <div className="flex justify-center text-sm font-light ">
      <p className="w-10/12 text-center">
        Hola <span className="uppercase pl-1 text-black font-semibold">{userDat?.usuUserName}</span>, Bienvenido al {presentacion}.
      </p>
    </div>
  )
}