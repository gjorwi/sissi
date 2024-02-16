'use client'
import "@/app/globals.css";
import { FaUser } from "react-icons/fa";
import useDataSavedStorage from "@/hooks/useDataSavedStorage";

export default function AsideDats({}){
  const {userDat}=useDataSavedStorage('userDat')

  return(
    <aside className="basis-1/4 flex justify-center items-center px-8 pt-8 text-sm font-semibold text-slate-600">
      <div className="flex flex-col gap-2 drop-shadow-sm rounded-lg bg-white p-4">
        <div className="flex flex-1 justify-center items-center text-4xl text-cyan-500">
          <FaUser />
        </div>
        <div className="flex flex-col gap-2 p-4 py-2">
          <div className="flex flex-col">
            Ususario: <span className="font-light ">{userDat?.usuName}</span>
          </div>
          <div className="flex flex-col">
            Institución: <span className="font-light ">{userDat?.usuInstName}</span>
          </div>
          <div className="flex flex-col">
            Departamento: <span className="font-light ">{userDat?.usuDepartName}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}