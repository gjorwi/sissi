'use client'
import {getInstitucionesLogin} from "@/servicios/admin/get"
import {addLoginAdmin,addLoginUser} from "@/servicios/admin/post"
import { useRouter } from 'next/navigation'
import { useEffect, useState,useRef } from "react";
import { useForm } from "react-hook-form";
import CustomLoading from "@/components/loading/customLoading";
import ModalMessAction from "@/components/modals/modalMessAction";
import {storageUserDat} from '@/utils/utilidades'
import Image from 'next/image';

export default function Login() {
  const {register,handleSubmit,reset,formState:{errors }} = useForm({mode:'onChange'});
  const [instituciones,setInstituciones]=useState([])
  const submitTypeval=useRef('')
  const [ctrlLoading,setCtrlLoading]=useState(false)
  const [ctrlModal,setCtrlModal]=useState(false)
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')
  const router = useRouter()

  useEffect(()=>{
    getAllInst()
  },[])

  const getAllInst= async()=>{
    const {data}= await getInstitucionesLogin()
    setInstituciones(data)
  }

  const questionAction=(val)=>{
    setMessage(val)
    setCtrlModal(true)
    setTypeModal('r')
  }
  const resultOption= ()=>{}

  const submitType= (val)=>{
    submitTypeval.current=val
    submitFunction()
  }

  const submitFunction =handleSubmit(async (dat)=>{
    var btnAdmin='Administrador'
    var btnEntrar='Entrar'
    setCtrlLoading(true)
    if(submitTypeval.current==btnAdmin){
      const {data,mensaje,error,codigo}= await addLoginAdmin(dat)
      if(!error && (codigo!=501 || codigo!=500)){
        // sessionStorage.setItem('userDat',JSON.stringify(data))
        await storageUserDat('userDat',data)
        setCtrlLoading(false)
        router.push('/admin')
        reset({usuUserName: '', usuPassword: '', usuInstId:''})
        questionAction('Entrando...')
        return
      }
      questionAction(mensaje)
      setCtrlLoading(false)
    }else if(submitTypeval.current==btnEntrar){
      const {data,mensaje,error,codigo}= await addLoginUser(dat)
      if(!error && (codigo!=501 || codigo!=500)){
        await storageUserDat('userDat',data)
        setCtrlLoading(false)
        router.push('/home')
        reset({usuUserName: '', usuPassword: '', usuInstId:''})
        questionAction('Entrando...')
        return
      }
      questionAction(mensaje)
      setCtrlLoading(false)
    }else{
      setCtrlLoading(false)
    }
  })
  return (
    <>
      {ctrlLoading &&
        <CustomLoading/>
      }
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <main className="flex h-screen justify-center items-center text-sm text-slate-700 w-5/6">
        <form onSubmit={submitFunction} autoComplete="off" className="flex flex-col rounded-2xl bg-gradient-to-b from-cyan-300 from-[-250%] to-transparent to-[40%] shadow ">
          <div className="px-8 py-6">
            <div className="flex flex-col items-center p-2 justify-center text-2xl font-bold text-slate-900">
              {/* <Image src="/img/logo.png" alt="Large Image" width={150} height={150} className="opacity-90 -mt-4"/> */}
              <h1 className="">SISSI</h1>
              <p className="text-sm font-light">Sistema de solicitud de servicios institucional</p>
              <div className="p-2 mt-4">
                <select name="usuInstId" {...register("usuInstId", { required: {value:true,message:'La institución es requerida.'} })} className="text-xs font-light p-2 outline-none rounded-lg bg-cyan-500 text-white">
                  <option value="">Seleccione</option>
                  {instituciones?.length!=0 &&
                    <>
                      {
                        instituciones?.map((institucion,i)=>(
                          <option key={i+'login'} value={institucion._id}>{institucion.instName}</option>
                        ))
                      }
                    </>
                  }
                </select>
                {errors.usuInstId && <p className="text-red-400 text-xs ml-2">{errors.usuInstId.message}</p>}
              </div>
              <div className="h-[1px] w-11/12 bg-slate-100 mt-4"></div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="usuUserName">Usuario</label>
              <input {...register("usuUserName", { required: {value:true,message:'El usuario es requerido.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="jose gomez..." name="usuUserName" />
              {errors.usuUserName && <p className="text-red-400 text-xs ml-2">{errors.usuUserName.message}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="usuPassword">Contraseña</label>
                <input type="password" autoComplete="new-password" {...register("usuPassword", { required: {value:true,message:'La contraseña es requerid1.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="******" name="usuPassword" />
                {errors.usuPassword && <p className="text-red-400 text-xs ml-2">{errors.usuPassword.message}</p>}
              </div>
            <div className="flex justify-end text-sm text-white p-2">
              <button onClick={()=>submitType('Administrador')} className="cursor-pointer text-cyan-500 text-xs underline p-2">Administrar?</button>
            </div>
          </div>
          <div className="h-[1px] w-full bg-slate-100 mb-3"></div>
          <div className="flex flex-col items-center justify-center mb-4 px-8 py-2">
            {/* <Link href={'/home'} className="flex justify-center bg-cyan-500 px-4 w-full rounded-lg text-white py-3"><span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">Entrar</span></Link> */}
            {/* <input type="submit" {...register("typeButton2")} defaultValue='Entrar' className="flex justify-center bg-cyan-500 px-4 w-full rounded-lg text-white py-3 cursor-pointer"/> */}
            <button onClick={()=>submitType('Entrar')} className="flex justify-center bg-cyan-500 px-4 w-full rounded-lg text-white py-3 cursor-pointer"><span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">Entrar</span></button>
          </div>
        </form>
      </main>
    </>
  );
}
