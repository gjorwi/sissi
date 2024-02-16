import {API_URL} from "@/config"

export async function getDepartamentosPer(data,token){
  try {
    let resultData= await fetch(API_URL+'/user/departamentos/personalizado/put', {
      method: 'PUT',
      headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return resultData.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de instituciones.')
  }
}
export async function getUsuariosPer(data,token){
  try {
    let resultData= await fetch(API_URL+'/user/usuarios/personalizado/put', {
      method: 'PUT',
      headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return resultData.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de instituciones.')
  }
}
export async function getSolicitudes(data,token){
  try {
    let resultData= await fetch(API_URL+'/user/solicitudes/put', {
      method: 'PUT',
      headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return resultData.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de instituciones.')
  }
}