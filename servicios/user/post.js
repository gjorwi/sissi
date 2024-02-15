import {API_URL} from "@/config"

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