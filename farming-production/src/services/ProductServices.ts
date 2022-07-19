import Swal from 'sweetalert2';
import http from '../http-common';
import IProductData from '../models/Product';

 /* ================ CREATE ================ */
const create = async (data: IProductData) => {    
    try {
      const response = await http.post<IProductData>("/product", data);
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
const retrieve = async (id: number) => {
  return http.get<IProductData>(`/product/${id}`);
};

 /* ================ UPDATE ================ */
const update = async (data: IProductData) => {
  try {    
    const response = await http.put<IProductData>(`/product/${data.id}`, data);
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
const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/product/${id}`);
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
 const list = (page: number, size: number, sort? : String) => {
  const urlRequest : string = "/product/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IProductData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/product/count");
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