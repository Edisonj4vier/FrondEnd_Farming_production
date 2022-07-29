import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import IMaintenenceModel from "../../models/Maintenence";
import MaintenenceService from "../../services/MaintenenceService";

export const MaintenenceLsit = () => {
      
  let navigate = useNavigate();

  //Hook: Define un atributo y la función que lo va a actualizar
  const [maintenence, setMaintenence] = useState<Array<IMaintenenceModel>>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  //Hook para llamar a la Web API
  useEffect(() => {
      getItems();  
      listMaintenence(0, itemsPerPage);           
      }, []);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listMaintenence(numberPage, itemsPerPage);
    };

//Función que llama al Service para listar los datos desde la Web API
const listMaintenence = (page: number, size: number) => {
MaintenenceService.list(page, size)
  .then((response: any) => {
    setMaintenence(response.data); //Víncula el resultado del servicio con la función del Hook useState
    console.log("Esto es de listMaintenece", response.data);
  })
  .catch((e: Error) => {
    console.log(e);
  });
};

const getItems = () => {
MaintenenceService.count().then((response: any) =>{
 var itemsCount = response;
 setItemsCount(itemsCount);
 setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
 setItemsPerPage(5)
 console.log(response);
}).catch((e : Error)=> {
 console.log(e);
});
}

const removeMaintenence = (id: number) => {
 Swal.fire({
     title: '¿Desea eliminar el mantenimiento?',
     showDenyButton: true,
     confirmButtonText: 'Si',
     denyButtonText: 'No',
   }).then((result) => {            
     if (result.isConfirmed) {
        MaintenenceService.remove(id)
         .then((response: any) => {
           listMaintenence(0,itemsPerPage);
           console.log(response.data);
           navigate("/maintenance");
         })
         .catch((e: Error) => {
           console.log(e);
         });      

     }
   });        
};



return ( 

 <div className='list row'>
     <h1>Hay {itemsCount} Mantenimientos</h1>
     <div className='col-md-12'>
         <table className='table'>
             <thead>
                 <tr>
                     <th>#</th>
                     <th>Título</th>
                     <th>Descripción</th>
                     <th>Fecha de creacion</th>
                     <th>Cantidad</th>
                     <th>Estado</th>
                     <th>
                       <Link to={"/maintenance/create"} className="btn btn-success">
                           <FaPlus /> Agregar
                       </Link>
                     </th>
                     <th>
                   

                     </th>
                 </tr>
             </thead>
             <tbody>
                 {maintenence && maintenence.map((maintenance, index) => (                          
                     <tr key={index}>
                         <td>{++index}</td>
                         <td>{maintenance.name}</td>
                         <td>{maintenance.description}</td>
                         <td>{maintenance.date.getDate()}</td>
                         <td>{maintenance.amount}</td>
                         <th>{maintenance.state}</th>
                         <td>
                 
                         <div className="btn-group" role="group">
                         <Link to={"/maintenance/retrieve/" + maintenance.id} className="btn btn-warning">
                             <FaEye /> Ver
                           </Link>                                  
                           <Link to={"/maintenance/update/" + maintenance.id} className="btn btn-primary">
                               <FaPen /> Editar
                           </Link>

                           <button className="btn btn-danger" onClick={() => removeMaintenence(maintenance.id!)}>
                             <FaTrash /> Eliminar
                           </button>

                           
                         </div>
                             
                         </td>
                     </tr>                        
                 ))}
             </tbody>
         </table>
         
         <ReactPaginate
             className="pagination justify-content-center pagination-sm mb-4"
             breakLabel="..."
             nextLabel="siguiente >"
             onPageChange={handlePageClick}
             pageRangeDisplayed={3}
             pageCount={pageCount}
             previousLabel="< anterior"/>
       
     </div>            
 </div>
);
}