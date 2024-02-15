'use client'
import "@/app/globals.css";
import { MdDelete } from "react-icons/md";
import { getSolicitudes } from '@/servicios/user/get'
import { deleteInstituciones } from '@/servicios/admin/put'
import { useEffect,useState } from "react";
import ModalMessAction from "../modals/modalMessAction";
import {getStoragedUserDat,removeStoragedUserDat} from "@/utils/utilidades";
import CustomLoading from "@/components/loading/customLoading";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

export default function ListRUDInst(){
  const [solicitudes,setSolicitudes]=useState(null)
  const [userDat,setUserDat]=useState('')
  const [ctrlModal,setCtrlModal]=useState(false)
  const [passVal,setPassVal]=useState('')
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')
  const router = useRouter();

  useEffect(()=>{
    const functAweit= async()=>{
      const valUser= await getStoragedUserDat("userDat")
      setUserDat(valUser)
      getAll(valUser)
    }
    functAweit()
  },[])

  //ESTRAER INSTITUCIONES
  const getAll = async(val)=>{
    const {data,mensaje,error}= await getSolicitudes(val.token)
    setSolicitudes(data)
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
  //DELETE
  const delecte = async(id)=>{
    var sendData={_id:id,usuId:userDat._id}
    const {data,mensaje,error}= await deleteInstituciones(sendData,userDat.token)
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
        <div className="flex flex-col text-sm bg-white rounded-xl drop-shadow-sm pb-4">
          <div className="grid grid-cols-3 gap-2 bg-slate-200 p-2 rounded-lg uppercase">
            <div>Departamento</div>
            <div>Usuario</div>
            <div className="flex justify-center">Acción</div>
          </div>
          {(solicitudes && solicitudes?.length!=0) ?
            <>
              {
                solicitudes?.map((solicitude,i)=>(
                  <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center pl-2">{solicitude?.instName}</div>
                    <div className="flex items-center pl-1">{solicitude?.instDireccion}</div>
                    <div onClick={()=>questionAction(solicitude?._id)} className="flex justify-center items-center text-red-500 cursor-pointer p-2"><MdDelete className="text-lg"/></div>
                  </div>
                ))
              }
            </>
            :<>
              <div className="text-xs p-2">No hay solicitudes registradas</div>
            </>
          }
        </div>
      </Suspense>
    </>
  )
}