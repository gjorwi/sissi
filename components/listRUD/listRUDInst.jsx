'use client'
import "@/app/globals.css";
import { MdDelete } from "react-icons/md";
import { getInstituciones } from '@/servicios/get'
import { deleteInstituciones } from '@/servicios/put'
import { useEffect,useState } from "react";
import ModalMessAction from "../modals/modalMessAction";
import {getStoragedUserDat} from "@/utils/utilidades";
import CustomLoading from "@/components/loading/customLoading";
import { Suspense } from "react";

export default function ListRUDInst(){
  const [instituciones,setInstituciones]=useState(null)
  const [userDat,setUserDat]=useState('')
  const [ctrlModal,setCtrlModal]=useState(false)
  const [passVal,setPassVal]=useState('')
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')

  useEffect(()=>{
    setUserDat(getStoragedUserDat("userDat"))
    getAll()
  },[])

  const getAll = async()=>{
    const {data,mensaje,error}= await getInstituciones()
    setInstituciones(data)
  }
  const questionAction=(val)=>{
    setPassVal(val)
    setTypeModal('q')
    setMessage('La institución será eliminada.')
    setCtrlModal(true)
  }
  const messageInfo=(val)=>{
    setTypeModal('r')
    setMessage(val)
    setCtrlModal(true)
  }
  const resultOption= ()=>{
    delecte(passVal)
  }
  const delecte = async(id)=>{
    var sendData={_id:id,usuId:userDat._id}
    const {data,mensaje,error}= await deleteInstituciones(sendData,userDat.token)
    if(error){
      messageInfo(mensaje)
      return
    }
    getAll()
  }

  return(
    <>
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <Suspense fallback={<CustomLoading/>}>
        <div className="flex flex-col text-sm">
          <div className="grid grid-cols-3 gap-2 bg-slate-200 p-2 rounded-lg uppercase">
            <div>Nombre</div>
            <div>Dirección</div>
            <div className="flex justify-center">Acción</div>
          </div>
          {instituciones?.length==0 ?
            <div className="text-xs p-2">No hay instituciones registradas</div>
            :<>
            {
              instituciones?.map((institucion,i)=>(
                <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center pl-2">{institucion.instName}</div>
                  <div className="flex items-center pl-1">{institucion.instDireccion}</div>
                  <div onClick={()=>questionAction(institucion._id)} className="flex justify-center items-center text-red-500 cursor-pointer p-2"><MdDelete className="text-lg"/></div>
                </div>
              ))
            }
            </>
          }
        </div>
      </Suspense>
    </>
  )
}