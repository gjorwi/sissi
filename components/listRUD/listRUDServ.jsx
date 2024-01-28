'use client'
import "@/app/globals.css";
import { MdDelete } from "react-icons/md";
import { getDepartamentos} from '@/servicios/get'
import { deleteDepartamentos } from '@/servicios/put'
import { useEffect,useState } from "react";
import ModalMessAction from "../modals/modalMessAction";
import {getStoragedUserDat} from "@/utils/utilidades";

export default function ListRUDServ(){
  const [userDat,setUserDat]=useState('')
  const [departamentos,setDepartamentos]=useState(null)
  const [ctrlModal,setCtrlModal]=useState(false)
  const [passVal,setPassVal]=useState('')
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')

  useEffect(()=>{
    setUserDat(getStoragedUserDat("userDat"))
    getAll()
  },[])

  const getAll = async()=>{
    const {data,mensaje,error}= await getDepartamentos()
    setDepartamentos(data)
  }
  const questionAction=(val)=>{
    setPassVal(val)
    setTypeModal('q')
    setMessage('El departamento será eliminado.')
    setCtrlModal(true)
  }
  const resultOption= ()=>{
    delecte(passVal)
  }
  const delecte = async(id)=>{
    var idDelete={_id:id}
    const {data,mensaje,error}= await deleteDepartamentos(idDelete,userDat)
    getAll()
  }

  return(
    <>
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <div className="flex flex-col text-sm">
        <div className="grid grid-cols-3 gap-2 bg-slate-200 p-2 rounded-lg uppercase">
          <div>Nombre</div>
          <div>Descripción</div>
          <div className="flex justify-center">Acción</div>
        </div>
        {departamentos?.length==0 ?
          <div className="text-xs p-2">No hay departamentos registrados</div>
          :<>
          {
            departamentos?.map((departamento,i)=>(
              <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center pl-2">{departamento.departName}</div>
                <div className="flex items-center pl-1">{departamento.departDescripcion}</div>
                <div onClick={()=>questionAction(departamento._id)} className="flex justify-center items-center text-red-500 cursor-pointer p-2"><MdDelete className="text-lg"/></div>
              </div>
            ))
          }
          </>
        }
      </div>
    </>
  )
}