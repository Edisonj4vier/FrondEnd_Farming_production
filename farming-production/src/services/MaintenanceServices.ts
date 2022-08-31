import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import IMaintenanceModel from "../models/Maintenance";

const create = async (data: IMaintenanceModel) => {    
  console.log(data);
    const url : string = `/products/${data.product!.id}/maintenances`;
    http.post<IMaintenanceModel>(url, data ,  {headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }}).then((response)=> {
      console.log(response);
      showAlert('¡Correcto!', 'Mantenimiento agregado correctamente');
    }).catch((err) => {
      console.error(err);
      showErrorAlert('¡Error!', 'El mantenimiento no pudo ser agregado');
    });
};

const retrieve = async (idProduct: number, id : number) => {
    return await http.get<IMaintenanceModel>(`/products/${idProduct}/maintenances/${id}` ,  {headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }});
};

const update = async (data: IMaintenanceModel) => {     
  const url : string = `/products/${data.product!.id}/maintenances/${data.id!}`; 
  http.put<IMaintenanceModel>(url, data ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response) => {
    console.log(response);
    showAlert('¡Correcto!','Mantenimiento actualizada correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El mantenimiento no pudo ser actualizada');
  });       
};


const remove = async (idProduct: number , id : number) => {
  const url : string = `/products/${idProduct}/maintenances/${id}`; 
  http.delete<string>(url ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response) =>{
    console.log(response);
    showAlert('¡Correcto!','Mantenimieto eliminado correctamente');
  }).catch((err)=>{
    console.error(err);
    showErrorAlert('¡Error!', 'Mantenimieto no se elimino');
  });
};


const list = async (idProduct: number) => {
  const url : string = `/products/${idProduct}/maintenances`;  
  return await http.get<Array<IMaintenanceModel>>(url ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
};

const MaintenanceService = {
  create,
  retrieve,
  update,
  remove,
  list
};

export default MaintenanceService;