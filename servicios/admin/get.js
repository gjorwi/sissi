import {API_URL} from "@/config"

export async function getInstitucionesLogin(){
  try {
    let allData= await fetch(API_URL+'/admin/instituciones/getLogin', {
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
export async function getInstituciones(token){
  try {
    let allData= await fetch(API_URL+'/admin/instituciones/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
        'Authorization': token,
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
export async function getDepartamentos(token){
  try {
    let allData= await fetch(API_URL+'/admin/departamentos/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
        'Authorization':  token,
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
export async function getUsuarios(token){
  try {
    let allData= await fetch(API_URL+'/admin/usuarios/get', {
      method: 'GET',
      cache:"no-cache",
      headers: {
        'Authorization': token,
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