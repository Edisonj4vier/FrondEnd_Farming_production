import Swal from "sweetalert2";
import http from "../http-common";
import IMaintenanceModel from "../models/Maintenance";

const create = async (data: IMaintenanceModel) => {    
  try {
    const url : string = "/products/" + data.product!.id + "/maintenances";
    const response = await http.post<IMaintenanceModel>(url, data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Mantenimiento creado correctamente',
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
/*
const retrieve = async (id: number) => {
    return http.get<IExamData>(`/exams/${id}`);
};

const update = async (data: IExamData) => {
  try {    
    const response = await http.put<IExamData>(`/exams/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El examen ha sido actualizado',
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

const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/exams/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El examen ha sido eliminado',
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


const list = (page: number, size: string, sort? : String) => {
  const urlRequest : string = "/exams/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IExamData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/exams/count");
  return response.data;
};
*/
const MaintenanceService = {
  create,
  //retrieve,
  //update,
  //remove,
  //list,
  //count

};
export default MaintenanceService;