import Swal from 'sweetalert2';
import http from '../http-common';
import IMaintenanceModel from '../models/Maintenance';
import IMaintenanceData from '../models/Product';


 /* ================ CREATE ================ */
const create = async (idProduct : string, data: IMaintenanceModel) => {    
    try {
      const response = await http.post<IMaintenanceData>(`${idProduct}/maintenances`, data);
      if(response.status === 201){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El producto ha sido creado correctamente',
          confirmButtonText: 'Aceptar'    
  
        });
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Network Error',
        confirmButtonText: 'Aceptar'    
      });
    }
  };

 /* ================ RETRIEVE ================ */
const retrieve = async (idProduct : string , id: number) => {
  return http.get<IMaintenanceData>(`${idProduct}/maintenances/${id}`);
};

 /* ================ UPDATE ================ */
const update = async (idProduct : string , data: IMaintenanceData) => {
  try {    
    const response = await http.put<IMaintenanceData>(`${idProduct}/maintenances/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El producto ha sido actualizado',
        confirmButtonText: 'Aceptar'    
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
    
};
 /* ================ DELETE ================ */
const remove = async (idProduct : string, id: number) => {
    try {
      const response = await  http.delete<string>(`${idProduct}/maintenances/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El producto ha sido eliminado',
          confirmButtonText: 'Aceptar'    
        });
    }
    } catch (error) {
      Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
    }
};

 /* ================ LIST ================ */ 
 const list = (idProduct : string) => {
  return http.get<Array<IMaintenanceData>>(`${idProduct}/maintenances`);
};


const maintenanceService = {
  create,
  retrieve,
  update,
  remove,
  list,
  
};
export default maintenanceService;