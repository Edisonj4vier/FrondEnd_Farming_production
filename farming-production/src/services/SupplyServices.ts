import Swal from 'sweetalert2';
import http from '../http-common';
import IMaintenanceData from '../models/Product';
import ISupplyModel from '../models/Supply';


 /* ================ CREATE ================ */
const create = async (idProduct : string, idMaintenance : string, data: ISupplyModel) => {    
    try {
      const response = await http.post<IMaintenanceData>(`${idProduct}/${idMaintenance}/supplies`, data);
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

 /* ================ DELETE ================ */
const remove = async (idProduct : string , idMaintenance : string , id: number) => {
    try {
      const response = await  http.delete<string>(`${idProduct}/${idMaintenance}/supplies/${id}`);
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
 const list = (idProduct : string , idMaintenance : string ) => {
  return http.get<Array<IMaintenanceData>>(`${idProduct}/${idMaintenance}/supplies`);
};


const supplyService = {
  create,
  remove,
  list,
  
};
export default supplyService;