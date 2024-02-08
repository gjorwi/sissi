import {API_URL} from "@/config"

export async function getInstituciones(){
  try {
    let allData= await fetch(API_URL+'/instituciones/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
      'Content-Type': 'application/json',
      }
    })
    let response=await allData.json()
    console.log('ESTA ES LA SALIDA: '+response)
    return response

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de instituciones.')
  }
}
export async function getDepartamentos(){
  try {
    let allData= await fetch(API_URL+'/departamentos/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
      'Content-Type': 'application/json',
      }
    })
    let response=await allData.json()
    return response

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de departamentos.')
  }
}
export async function getUsuarios(){
  try {
    let allData= await fetch(API_URL+'/usuarios/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
      'Content-Type': 'application/json',
      }
    })
    let response=await allData.json()
    return response

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de Usuarios.')
  }
}