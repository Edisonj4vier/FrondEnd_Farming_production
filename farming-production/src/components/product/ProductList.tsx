import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

export const ProductList = () => {
    
  let navigate = useNavigate();

    //Hook: Define un atributo y la función que lo va a actualizar
    const [products, setProducts] = useState<Array<IProductModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    //Hook para llamar a la Web API
    useEffect(() => {
        getItems();  
        listProducts(0, itemsPerPage);           
        }, []);
  
      const handlePageClick = (event: any) => {        
        const numberPage = event.selected;                   
        listProducts(numberPage, itemsPerPage);
      };

//Función que llama al Service para listar los datos desde la Web API
const listProducts = (page: number, size: number) => {
  ProductService.list(page, size)
    .then((response: any) => {
      setProducts(response.data); //Víncula el resultado del servicio con la función del Hook useState
      console.log("Esto es de listProducts", response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

const getItems = () => {
 ProductService.count().then((response: any) =>{
   var itemsCount = response;
   setItemsCount(itemsCount);
   setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
   setItemsPerPage(5)
   console.log(response);
 }).catch((e : Error)=> {
   console.log(e);
 });
}

const removeExam = (id: number) => {
   Swal.fire({
       title: '¿Desea eliminar el producto?',
       showDenyButton: true,
       confirmButtonText: 'Si',
       denyButtonText: 'No',
     }).then((result) => {            
       if (result.isConfirmed) {
           ProductService.remove(id)
           .then((response: any) => {
             listProducts(0,itemsPerPage);
             console.log(response.data);
             navigate("/products");
           })
           .catch((e: Error) => {
             console.log(e);
           });      

       }
     });        
};


return ( 
  
   <div className='list row'>
       <h1>Hay {itemsCount} productos</h1>
       <div className='col-md-12'>
           <table className='table'>
               <thead>
                   <tr>
                       <th>#</th>
                       <th>Título</th>
                       <th>Descripción</th>
                       <th>Categorias</th>
                       <th>Cantidad</th>
                       <th>
                         <Link to={"/products/create"} className="btn btn-success">
                             <FaPlus /> Agregar
                         </Link>
                       </th>
                       <th>
                     

                       </th>
                   </tr>
               </thead>
               <tbody>
                   {products && products.map((Product, index) => (                          
                       <tr key={index}>
                           <td>{++index}</td>
                           <td>{Product.name}</td>
                           <td>{Product.description}</td>
                           <td>{Product.category}</td>
                           <td>{Product.amount}</td>
                           <td>
                   
                           <div className="btn-group" role="group">
                           <Link to={"/products/retrieve/" + Product.id} className="btn btn-warning">
                               <FaEye /> Ver
                             </Link>                                  
                             <Link to={"/products/update/" + Product.id} className="btn btn-primary">
                                 <FaPen /> Editar
                             </Link>

                             <button className="btn btn-danger" onClick={() => removeExam(Product.id!)}>
                               <FaTrash /> Eliminar
                             </button>

                             
                           </div>
                               
                           </td>
                       </tr>                        
                   ))}
               </tbody>
           </table>
           
           <ReactPaginate
             className="pagination justify-content-center card-footer"
             breakLabel="..."
             nextLabel="siguiente >"
             onPageChange={handlePageClick}
             pageRangeDisplayed={5}
             pageCount={pageCount}
             previousLabel="< anterior"/>
       </div>            
   </div>
);

}

