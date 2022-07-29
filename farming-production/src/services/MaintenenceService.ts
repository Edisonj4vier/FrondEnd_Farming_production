import Swal from 'sweetalert2';
import http from '../http-common';
import IMaintenenceData from '../models/Maintenence';

 /* ================ CREATE ================ */
 const create = async (data: IMaintenenceData) => {    
    try {
      const response = await http.post<IMaintenenceData>("/maintenance", data);
      if(response.status === 201){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El matenimiento ha sido creado correctamente',
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
 const retrieve = async (id: number) => {
    return http.get<IMaintenenceData>(`/maintenance/${id}`);
  };
  
   /* ================ UPDATE ================ */
  const update = async (data: IMaintenenceData) => {
    try {    
      const response = await http.put<IMaintenenceData>(`/maintenance/${data.id}`, data);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El mantenimiento ha sido actualizado',
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
  const remove = async (id: number) => {
      try {
        const response = await  http.delete<string>(`/maintenance/${id}`);
        if(response.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'El mantenimiento ha sido eliminado',
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
   const list = (page: number, size: number, sort? : String) => {
    const urlRequest : string = "/maintenance/" + page + "/" + size ;
    console.log(urlRequest);
    return http.get<Array<IMaintenenceData>>(urlRequest);
  };
  
  const count = async () =>  {  
    const response = await http.get<number>("/maintenance/count");
    return response.data;
  };
  
  const MaintenenceService = {
    create,
    retrieve,
    update,
    remove,
    list,
    count
    
  };
  export default MaintenenceService;