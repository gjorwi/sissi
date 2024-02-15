'use client'
import "@/app/globals.css";
import { useEffect, useState } from "react";
import {getStoragedUserDat} from "@/utils/utilidades";
import { FaUser } from "react-icons/fa";

export default function AsideDats({}){
  const [userDat,setUserDat]=useState('')
  useEffect(() => {
    const userDatTemp=getStoragedUserDat("userDat")
    setUserDat(userDatTemp)
  }, [])
  return(
    <aside className="basis-1/4 px-8 pt-8 text-sm font-semibold text-slate-600 ">
      <div className="flex gap-2 drop-shadow-sm rounded-lg bg-white p-4">
        <div className="flex flex-1 justify-center items-center text-6xl text-cyan-500">
          <FaUser />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-col">
            USUARIO: <span className="font-light ">{userDat.usuName}</span>
          </div>
          <div className="flex flex-col">
          INSTITUCIÓN: <span className="font-light ">{userDat.usuInstName}</span>
          </div>
          <div className="flex flex-col">
          DEPARTAMENTO: <span className="font-light ">{userDat.usuDepartName}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}