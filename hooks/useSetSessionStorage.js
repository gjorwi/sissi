import { useState, useEffect } from "react";

export default function useGetSessionStorage(valName,valData){
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(sessionStorage.setItem(valName,JSON.stringify(valData)))
  }, [])

  return value
}