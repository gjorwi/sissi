'use client'
import BtnAction from "@/components/buttons/btnAction";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomLoading from "@/components/loading/customLoading";
import ModalMessAction from "@/components/modals/modalMessAction";
import { getDepartamentosPer,getUsuariosPer } from '@/servicios/user/put'
import { addSolicitudes } from '@/servicios/user/post'
import {removeStoragedUserDat} from '@/utils/utilidades'
import useDataSavedStorage from "@/hooks/useDataSavedStorage";
import { useRouter } from "next/navigation";

export default function New() {
  const {userDat}=useDataSavedStorage('userDat')
  const {register,handleSubmit,reset,formState:{errors }} = useForm({mode:'onChange'});
  const [dataDepart,setDataDepart]=useState([])
  const [dataUsu,setDataUsu]=useState([])
  const [ctrlModal,setCtrlModal]=useState(false)
  const [message,setMessage]=useState('')
  const [typeModal,setTypeModal]=useState('')
  const [ctrlLoading,setCtrlLoading]=useState(false)
  const router = useRouter();

  useEffect(()=>{
    if(userDat)
    getAllDepart(userDat)
  },[userDat])

  //EXTRAER DEPARTAMENTOS
  const getAllDepart = async(val)=>{
    let sendData={departId:val.usuDepartId}
    const {data,mensaje,error}= await getDepartamentosPer(sendData,val.token)
    setDataDepart(data)
    if(error){
      var msj='El token de seguridad ha expirado.'
      messageInfo(mensaje)
      if(mensaje==msj){
        removeStoragedUserDat('userDat')
        router.replace("/");
      }
    }
  }
  //EXTRAER USUARIOS
  const getAllUsu = async(departId,val)=>{
    let sendData={usuInstId:val.usuInstId,usuDepartId:departId}
    const {data,mensaje,error}= await getUsuariosPer(sendData,val.token)
    setDataUsu(data)
    if(error){
      var msj='El token de seguridad ha expirado.'
      messageInfo(mensaje)
      if(mensaje==msj){
        removeStoragedUserDat('userDat')
        router.replace("/");
      }
    }
  }
  //MODAL INFO
  const messageInfo=(val)=>{
    setTypeModal('r')
    setMessage(val)
    setCtrlModal(true)
  }
  const resultOption= ()=>{}
  //SUBMIT DATA
  const submitFunction =handleSubmit(async (dat)=>{
    dat={...dat,['usuId']:userDat._id}
    const {data,mensaje,error}= await addSolicitudes(dat,userDat.token)
    if(error){
      var msj='El token de seguridad ha expirado.'
      if(mensaje==msj){
        removeStoragedUserDat('userDat')
        router.replace("/");
      }
    }
    messageInfo(mensaje)
    reset({solDepartId: '',asignUsuId: '',solDescripcion: ''})
  })
  //ESTADOS SELECCION
  const handleChange = (e) => {
    getAllUsu(e.target.value,userDat)
  }

  return (
    <>
      {ctrlLoading &&
        <CustomLoading/>
      }
      {ctrlModal &&
        <ModalMessAction setCtrlModal={setCtrlModal} typeModal={typeModal} message={message} resultOption={resultOption}></ModalMessAction>
      }
      <main className="flex justify-center items-center mt-10 text-sm">
        {/* <div className="w-11/12 md:w-4/5"> */}
          <form onSubmit={submitFunction}  autoComplete="off">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label htmlFor="solDepartId">Departamento</label>
                <select {...register("solDepartId", { required: {value:true,message:'La institución es requerida.'} })} name="solDepartId" onChange={handleChange} className="text-xs h-10 border outline-none pl-1 rounded-lg mt-2">
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
                {errors.solDepartId && <p className="text-red-400 text-xs ml-2">{errors.solDepartId.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="asignUsuId">Asignar Usuario</label>
                <select {...register("asignUsuId")} name="asignUsuId"  className="text-xs h-10 border outline-none pl-1 rounded-lg mt-2">
                  <option value="">Seleccione</option>
                  {dataUsu?.length!=0 &&
                    <>
                      {
                        dataUsu?.map((usuario,i)=>(
                          <option key={i+'login'} value={usuario._id}>{usuario.usuName}</option>
                        ))
                      }
                    </>
                  }
                </select>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="solDescripcion">Descripción</label>
              <textarea type="text" {...register("solDescripcion", { required: {value:true,message:'La descripcion es requerida.'} })} className="text-xs uppercase rounded-lg border outline-none h-10 pl-2 mt-2" placeholder="Descripcion" name="solDescripcion" />
              {errors.solDescripcion && <p className="text-red-400 text-xs ml-2">{errors.solDescripcion.message}</p>}
            </div>
            <BtnAction className={'w-full mt-8'} label={'Guardar'} type={"submit"}></BtnAction>
          </form>
        {/* </div> */}
      </main>
    </>
  );
}
