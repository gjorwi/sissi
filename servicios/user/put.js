import {API_URL} from "@/config"

// export async function deleteInstituciones(data,token){
//   try {
//     let deleteData= await fetch(API_URL+'/instituciones/put', {
//       method: 'PUT',
//       headers: {
//       'Authorization': token,
//       'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//     return deleteData.json()

//   } catch (error) {
//     console.error('Un error ha ocurrido: '+error)
//     throw new Error('Fallo al cargar los datos de instituciones.')
//   }
// }