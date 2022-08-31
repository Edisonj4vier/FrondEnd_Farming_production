import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import ISupplyModel from "../models/Supply";

const create = async (data: ISupplyModel) => {    
  console.log(data);
    const url : string = `/products/${data.product!.id}/supplies`;
    http.post<ISupplyModel>(url, data ,  {headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }}).then((response)=> {
      console.log(response);
      showAlert('¡Correcto!', 'Insumo agregado correctamente');
    }).catch((err) => {
      console.error(err);
      showErrorAlert('¡Error!', 'El insumo no pudo ser agregado');
    });
};

const retrieve = async (idProduct: number, id : number) => {
    return await http.get<ISupplyModel>(`/products/${idProduct}/supplies/${id}` ,  {headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }});
};

const update = async (data: ISupplyModel) => {     
  const url : string = `/products/${data.product!.id}/supplies/${data.id!}`; 
  http.put<ISupplyModel>(url, data ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response) => {
    console.log(response);
    showAlert('¡Correcto!','Insumo actualizada correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Insumo no pudo ser actualizada');
  });       
};


const remove = async (idProduct: number , id : number) => {
  const url : string = `/products/${idProduct}/supplies/${id}`; 
  http.delete<string>(url ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response) =>{
    console.log(response);
    showAlert('¡Correcto!','Insumo eliminado correctamente');
  }).catch((err)=>{
    console.error(err);
    showErrorAlert('¡Error!', 'Insumo no se elimino');
  });
};


const list = async (idProduct: number) => {
  const url : string = `/products/${idProduct}/supplies`;  
  return await http.get<Array<ISupplyModel>>(url ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
};

const SupplyService = {
  create,
  retrieve,
  update,
  remove,
  list
};

export default SupplyService;