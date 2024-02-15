'use client'
import BtnAction from "@/components/buttons/btnAction";
import ModalMessAction from "@/components/modals/modalMessAction";
import { addDepartamentos } from '@/servicios/admin/post'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {getStoragedUserDat,removeStoragedUserDat} from "@/utils/utilidades";
import { useRouter } from "next/navigation";

export default function Registrar() {
  const {register,handleSubmit,reset,formState:{errors }} = useForm({mode:'onChange'});
  const [userDat,setUserDat]=useState('')
  const [ctrlModal,setCtrlModal]=useState(false)
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')
  const router = useRouter();

  useEffect(()=>{
    setUserDat(getStoragedUserDat("userDat"))
  }, [])

  const messageInfo=(val)=>{
    setTypeModal('r')
    setMessage(val)
    setCtrlModal(true)
  }
  const resultOption= ()=>{}
  const submitFunction =handleSubmit(async (dat)=>{
    dat={...dat,['usuId']:userDat._id}
    const {data,mensaje,error}= await addDepartamentos(dat,userDat.token)
    if(error){
      var msj='El token de seguridad ha expirado.'
      if(mensaje==msj){
        removeStoragedUserDat('userDat')
        router.replace("/");
      }
    }
    messageInfo(mensaje)
    reset({departName: '',departDescripcion: ''})
  })
  
  return (
    <>
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <main className="flex justify-center items-center mt-10 text-sm">
        <form onSubmit={submitFunction} className="flex flex-col gap-2" autoComplete="off">
          <div className="flex flex-col">
            <label htmlFor="departName">Nombre</label>
            <input {...register("departName", { required: {value:true,message:'El nombre es requerido.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Departamento..." name="departName" />
            {errors.departName && <p className="text-red-400 text-xs ml-2">{errors.departName.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="departDescripcion">Descripción</label>
            <input type="text" {...register("departDescripcion", { required: {value:true,message:'La descripcion es requerida.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Descripcion" name="departDescripcion" />
            {errors.departDescripcion && <p className="text-red-400 text-xs ml-2">{errors.departDescripcion.message}</p>}
          </div>
          <BtnAction className={'w-full mt-8'} label={'Guardar'} type={"submit"}></BtnAction>
        </form>
      </main>
    </>
  );
}
