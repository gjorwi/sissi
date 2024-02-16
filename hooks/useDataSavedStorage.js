import { useState, useEffect } from "react";
import {getStoragedUserDat,removeStoragedUserDat} from "@/utils/utilidades";

export default function useDataSavedStorage(valName){
  const [userDat, setUserDat] = useState('')

  useEffect(() => {
    // const getValue=async()=>{
      let tempVal=JSON.parse(sessionStorage.getItem(valName))
      setUserDat(tempVal)

    // }
    // getValue()
    // alert(JSON.stringify(tempVal))
  }, [])

  return {userDat}
}