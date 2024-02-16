'use client'
import "@/app/globals.css";
import { MdDelete } from "react-icons/md";
import { getDepartamentos} from '@/servicios/admin/get'
import { deleteDepartamentos } from '@/servicios/admin/put'
import { useEffect,useState } from "react";
import ModalMessAction from "../modals/modalMessAction";
import {removeStoragedUserDat} from "@/utils/utilidades";
import CustomLoading from "@/components/loading/customLoading";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import useDataSavedStorage from "@/hooks/useDataSavedStorage";

export default function ListRUDServ(){
  const {userDat}=useDataSavedStorage('userDat')
  const [departamentos,setDepartamentos]=useState(null)
  const [ctrlModal,setCtrlModal]=useState(false)
  const [passVal,setPassVal]=useState('')
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')
  const router = useRouter();

  useEffect(()=>{
    if(userDat)
    getAll(userDat)
  },[userDat])

  //EXTRAER DEPARTAMENTOS
  const getAll = async(val)=>{
    const {data,mensaje,error}= await getDepartamentos(val.token)
    setDepartamentos(data)
    if(error){
      var msj='El token de seguridad ha expirado.'
      messageInfo(mensaje)
      if(mensaje==msj){
        removeStoragedUserDat('userDat')
        router.replace("/");
      }
    }
  }
  //MODAL ACTION/INFO
  const questionAction=(val)=>{
    setPassVal(val)
    setTypeModal('q')
    setMessage('El departamento será eliminado.')
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
  //DELETE
  const delecte = async(id)=>{
    var sendData={_id:id,usuId:userDat._id}
    const {data,mensaje,error}= await deleteDepartamentos(sendData,userDat)
    if(error){
      var msj='El token de seguridad ha expirado.'
      messageInfo(mensaje)
      if(mensaje==msj){
        removeStoragedUserDat('userDat')
        router.replace("/");
      }
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
            <div>Descripción</div>
            <div className="flex justify-center">Acción</div>
          </div>
          {departamentos?.length!=0 ?
            <>
              {
                departamentos?.map((departamento,i)=>(
                  <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center pl-2">{departamento?.departName}</div>
                    <div className="flex items-center pl-1">{departamento?.departDescripcion}</div>
                    <div onClick={()=>questionAction(departamento?._id)} className="flex justify-center items-center text-red-500 cursor-pointer p-2"><MdDelete className="text-lg"/></div>
                  </div>
                ))
              }
            </>
            :<>
              <div className="text-xs p-2">No hay departamentos registrados</div>
            </>
          }
        </div>
      </Suspense>
    </>
  )
}