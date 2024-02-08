import {API_URL} from "@/config"

export async function addLogin(data){
  try {
    var adddata= await fetch(API_URL+'/login/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return adddata.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de usuarios.')
  }
}

export async function addInstituciones(data,token){
  try {
    var adddata= await fetch(API_URL+'/instituciones/add', {
      method: 'POST',
      headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return adddata.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de instituciones.')
  }
}
export async function addDepartamentos(data,token){
  try {
    var adddata= await fetch(API_URL+'/departamentos/add', {
      method: 'POST',
      headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return adddata.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de departamentos.')
  }
}
export async function addUsuarios(data,token){
  try {
    var adddata= await fetch(API_URL+'/usuarios/add', {
      method: 'POST',
      headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return adddata.json()

  } catch (error) {
    console.error('Un error ha ocurrido: '+error)
    throw new Error('Fallo al cargar los datos de usuarios.')
  }
}