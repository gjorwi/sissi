import {API_URL} from "@/config"

export async function addLoginAdmin(data){
  try {
    var adddata= await fetch(API_URL+'/admin/loginadmin/add', {
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
export async function addLoginUser(data){
  try {
    var adddata= await fetch(API_URL+'/user/loginuser/add', {
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
    var adddata= await fetch(API_URL+'/admin/instituciones/add', {
      method: 'POST',
      headers: {
        'Authorization': token,
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
    var adddata= await fetch(API_URL+'/admin/departamentos/add', {
      method: 'POST',
      headers: {
      'Authorization': token,
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
    var adddata= await fetch(API_URL+'/admin/usuarios/add', {
      method: 'POST',
      headers: {
      'Authorization': token,
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