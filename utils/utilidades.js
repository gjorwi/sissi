// import { setSession,getSession } from "next-session";
import { usePathname,useRouter } from "next/navigation";

export const checkPassword=(pass,confirm)=>{
  var mayorQ=pass.length>7
  var equal=pass===confirm
  return new Promise(resolve => {
    if(mayorQ && equal){
      resolve(true)
    }else{
      resolve(false)
    }
    
  });
}
export const onlyNumbers=(val,type)=>{
  const regex = /^[0-9]*$/;
  const onlyNumbers = regex.test(val);
  return new Promise(resolve => {
    
    if(onlyNumbers){
      if(type){
        resolve(val.length>6)
      }else{
        resolve(true)
      }
    }else{
      resolve(false)
    }
    
  });
}

export const storageUserDat = async (valName,data) => {
  return new Promise(async resolve => {
    // Guardar el token de seguridad en la sesión
    await sessionStorage.setItem(valName,JSON.stringify(data))
    // await sessionStorage.setItem(valName,data)

    resolve()
  })
};
export const getStoragedUserDat =  (valName) => {
  // return new Promise(async resolve => {
    const dataGot= JSON.parse(sessionStorage.getItem(valName))

    return dataGot
  // })
};
export const removeStoragedUserDat =  (valName) => {
  // return new Promise(async resolve => {
    const dataGot= sessionStorage.removeItem(valName);

    return 
  // })
};
