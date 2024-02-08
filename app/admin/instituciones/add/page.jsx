'use client'
import BtnAction from "@/components/buttons/btnAction";
import ModalMessAction from "@/components/modals/modalMessAction";
import { addInstituciones } from '@/servicios/add'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {getStoragedUserDat} from "@/utils/utilidades";

export default function Registrar() {
  const {register,handleSubmit,reset,formState:{errors }} = useForm({mode:'onChange'});
  const [userDat,setUserDat]=useState('')
  const [ctrlModal,setCtrlModal]=useState(false)
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')

  useEffect(()=>{
    setUserDat(getStoragedUserDat("userDat"))
  }, [])

  const questionAction=(val)=>{
    setMessage(val)
    setCtrlModal(true)
    setTypeModal('r')
  }

  const resultOption= ()=>{}

  const submitFunction =handleSubmit(async (dat)=>{
    dat={...dat,['usuId']:userDat._id}
    // alert(JSON.stringify(dat))
    const {data,mensaje,error}= await addInstituciones(dat,userDat.token)
    questionAction(mensaje)
    reset({instName: '',instDireccion: '',instDescripcion: ''})
  })
  
  return (
    <>
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <main className="flex justify-center items-center mt-10 text-sm">
        <form onSubmit={submitFunction} className="flex flex-col gap-2" autoComplete="off">
          <div className="flex flex-col">
            <label htmlFor="instName">Nombre</label>
            <input {...register("instName", { required: {value:true,message:'El nombre es requerido.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Empresa..." name="instName" />
            {errors.instName && <p className="text-red-400 text-xs ml-2">{errors.instName.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="instDireccion">Dirección</label>
            <input type="text" {...register("instDireccion", { required: {value:true,message:'La direccion es requerida.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Av. calle..." name="instDireccion" />
            {errors.instDireccion && <p className="text-red-400 text-xs ml-2">{errors.instDireccion.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="instDescripcion">Descripción</label>
            <input type="text" {...register("instDescripcion", { required: {value:true,message:'La descripcion es requerida.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Descripcion" name="instDescripcion" />
            {errors.instDescripcion && <p className="text-red-400 text-xs ml-2">{errors.instDescripcion.message}</p>}
          </div>
          <BtnAction className={'w-full mt-8'} label={'Guardar'} type={"submit"}></BtnAction>
        </form>
      </main>
    </>
  );
}
