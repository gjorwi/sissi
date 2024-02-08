'use client'
import BtnAction from "@/components/buttons/btnAction";
import ModalMessAction from "@/components/modals/modalMessAction";
import {checkPassword,onlyNumbers,getStoragedUserDat} from '@/utils/utilidades'
import { getInstituciones,getDepartamentos } from '@/servicios/get'
import { addUsuarios } from '@/servicios/add'
import CustomLoading from "@/components/loading/customLoading";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Registrar() {
  const {register,handleSubmit,reset,formState:{errors }} = useForm({mode:'onChange'});
  const [userDat,setUserDat]=useState('')
  const [ctrlLoading,setCtrlLoading]=useState(false)
  const [dataInst,setDataInst]=useState([])
  const [dataDepart,setDataDepart]=useState([])
  const [ctrlModal,setCtrlModal]=useState(false)
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')

  useEffect(()=>{
    setUserDat(getStoragedUserDat("userDat"))
  }, [])

  useEffect(()=>{
    getAllInst()
    getAllDepart()
  }, [])

  const getAllInst = async()=>{
    const {data}= await getInstituciones()
    setDataInst(data)
  }
  const getAllDepart = async()=>{
    const {data}= await getDepartamentos()
    setDataDepart(data)
  }

  const questionAction=(val)=>{
    setMessage(val)
    setCtrlModal(true)
    setTypeModal('r')
  }

  const resultOption= ()=>{}

  const submitFunction =handleSubmit(async (dat)=>{
    dat={...dat,['usuId']:userDat._id}
    setCtrlLoading(true)
    const check= await checkPassword(dat.usuPassword,dat.usuPasswordconfirm)
    const numberCheck= await onlyNumbers(dat.usuCed,false)
    const cellCheck= await onlyNumbers(dat.usuTelefono,true)
    if(!check || !numberCheck || !cellCheck){
      if(!check){
        questionAction('Contraseña deben ser iguales y contener al menos 8 digitos')
      }
      if(!numberCheck){
        questionAction('Cedula debe contener solo numeros y tener al menos 7 digitos.')
      }
      if(!cellCheck){
        questionAction('Telefono debe contener solo numeros')
      }
      return
    }
    const {data,mensaje,error,codigo}= await addUsuarios(dat,userDat.token)
    setCtrlLoading(false)
    if(!error && (codigo!=501 || codigo!=500)){
      reset({usuName: '',usuCed: '',usuUserName: '',usuTelefono:'',usuPassword: '',usuPasswordconfirm: '',instCod: '',departCod: ''})
    }
    questionAction(mensaje)
  })
  
  return (
    <>
      {ctrlLoading &&
        <CustomLoading/>
      }
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <main className="flex justify-center items-center mt-10 text-sm">
        <form onSubmit={submitFunction} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="usuCed">Cedula</label>
              <input {...register("usuCed", { required: {value:true,message:'La cedula es requerida.'}})} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="19554780" name="usuCed" />
              {errors.usuCed && <p className="text-red-400 text-xs ml-2">{errors.usuCed.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="instCod">Institución</label>
              <select {...register("instCod", { required: {value:true,message:'La institución es requerida.'} })} name="instCod" className="text-xs h-10 border outline-none pl-1 rounded-lg mt-2">
                <option value="">Seleccione</option>
                {dataInst?.length!=0 &&
                  <>
                    {
                      dataInst?.map((institucion,i)=>(
                        <option key={i+'login'} value={institucion._id}>{institucion.instName}</option>
                      ))
                    }
                  </>
                }
              </select>
              {errors.instCod && <p className="text-red-400 text-xs ml-2">{errors.instCod.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="departCod">Departamento</label>
              <select {...register("departCod", { required: {value:true,message:'La institución es requerida.'} })} name="departCod" className="text-xs h-10 border outline-none pl-1 rounded-lg mt-2">
                <option value="">Seleccione</option>
                {dataDepart?.length!=0 &&
                  <>
                    {
                      dataDepart?.map((departamento,i)=>(
                        <option key={i+'login'} value={departamento._id}>{departamento.departName}</option>
                      ))
                    }
                  </>
                }
              </select>
              {errors.departCod && <p className="text-red-400 text-xs ml-2">{errors.departCod.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="usuName">Nombre</label>
              <input {...register("usuName", { required: {value:true,message:'El nombre es requerido.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="jose gomez..." name="usuName" />
              {errors.usuName && <p className="text-red-400 text-xs ml-2">{errors.usuName.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="usuTelefono">Telefono</label>
              <input type="text" {...register("usuTelefono", { required: {value:true,message:'El telefono es requerido.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="04169654073..." name="usuTelefono" />
              {errors.usuTelefono && <p className="text-red-400 text-xs ml-2">{errors.usuTelefono.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="usuUserName">Usuario</label>
              <input type="text" autoComplete="off" {...register("usuUserName", { required: {value:true,message:'El usuario es requerido.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Gjorwi06" name="usuUserName" />
              {errors.usuUserName && <p className="text-red-400 text-xs ml-2">{errors.usuUserName.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="usuPassword">Contraseña</label>
              <input type="password" autoComplete="new-password" {...register("usuPassword", { required: {value:true,message:'La contraseña es requerid1.'} })} className="text-xs rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="******" name="usuPassword" />
              {errors.usuPassword && <p className="text-red-400 text-xs ml-2">{errors.usuPassword.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="usuPasswordconfirm">Confirmar contraseña</label>
              <input type="password" {...register("usuPasswordconfirm", { required: {value:true,message:'Confirmar la contraseña.'} })} className="text-xs rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="******" name="usuPasswordconfirm" />
              {errors.usuPasswordconfirm && <p className="text-red-400 text-xs ml-2">{errors.usuPasswordconfirm.message}</p>}
            </div>
            <div className="flex justify-center items-center">
              <label htmlFor="admin" >Admin</label>
              <input type="checkbox" {...register("admin")} className="text-xs ml-2 rounded-lg border outline-none " name="admin" />
            </div>
            <div className="flex justify-center items-center">
              <label htmlFor="onlyRead" >Solo lectura</label>
              <input type="checkbox" {...register("onlyRead")} className="text-xs ml-2 rounded-lg border outline-none " name="onlyRead" />
            </div>
          </div>
          <BtnAction className={'w-full mt-8 mb-4'} label={'Guardar'} type={"submit"}></BtnAction>
        </form>
      </main>
    </>
  );
}
