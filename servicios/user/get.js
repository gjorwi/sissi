import {API_URL} from "@/config"

export async function getSolicitudes(token){
  try {
    let allData= await fetch(API_URL+'/user/solicitudes/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    }).catch(()=>{
      // console.error('Un error ha ocurrido: '+error)
      throw new Error('Fallo al cargar los datos de solicitudes.')
    })
    let response=await allData.json()
    console.log('ESTA ES LA SALIDA: '+JSON.stringify(response))
    return response

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    // throw new Error('Fallo al cargar los datos de solicitudes.')
  }
}
