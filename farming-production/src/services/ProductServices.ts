import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import IProductModel from "../models/Product";

const create = async (data: IProductModel) => {    
  const url : string = `/products`;
  http.post<IProductModel>(url, data).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Producto agregado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Producto no pudo ser agregado');
  });  
};

const retrieve = async (id: number) => {
    return await http.get<IProductModel>(`/products/${id}`);
};

const update = async (data: IProductModel) => {
  const url : string = `/products/${data.id}`;
  http.put<IProductModel>(url, data,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Producto actualizado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Producto no pudo ser actualizado');
  }); 
};

const remove = async (id: number) => {
  const url : string = `/products/${id}`;
  http.delete<string>(url ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Producto eliminado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Producto no pudo ser eliminado');
  });
};


const list = async (page: number, size: string, sort? : String) => {
  const urlRequest : string = "/products/" + page + "/" + size ;
  console.log(urlRequest ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
  return await http.get<Array<IProductModel>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/products/count" ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
  return response.data;
};

const ProductService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default ProductService;