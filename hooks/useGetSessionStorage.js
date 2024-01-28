import { useState, useEffect } from "react";

export default function useGetSessionStorage(valName){
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(sessionStorage.getItem(valName))
    alert(sessionStorage.getItem(valName))
  }, [])

  return value
}
