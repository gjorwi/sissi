import Link from "next/link";
import "@/app/globals.css";
import { useEffect, useState } from "react";

export default function ModalMessAction({message='Informacion de prueba',setCtrlModal,resultOption,typeModal}){

  const closeModal =()=>{
    setCtrlModal(false)
  }
  const aceptOption=()=>{
    resultOption()
    closeModal()
  }
  
  return(
    <>
      <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/20 grid place-content-center">
        <div className="bg-white flex flex-col rounded-lg">
          <div className="p-2">{message}</div>
          <div className={'flex justify-center gap-4 py-2'}>
            {typeModal.toLowerCase()=='q' &&
              <button className="bg-slate-200 rounded-lg px-2 py-1" onClick={closeModal}>Cancelar</button>
            }
            <button className="bg-cyan-500 text-white px-2 py-1 rounded-lg" onClick={aceptOption}>Aceptar</button>
          </div>
        </div>
      </div>
    </>
  )
}