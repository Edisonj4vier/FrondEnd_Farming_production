import { useEffect, useState } from "react";
import {  FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import IMaintenanceModel from "../../models/Maintenance";
import MaintenanceService from "../../services/MaintenanceServices";
import { showAlert, showErrorAlert } from "../../common/alerts";

type AppProps = {
    idProduct : number;
  }

export const SupplyList = (props: AppProps) => {

    const [maintenances, setMaintenances] = useState<Array<IMaintenanceModel>>([]);


    useEffect(() => {
          MaintenanceService.list(props.idProduct)
          .then((response: any) => {
            setMaintenances(response.data); //Víncula el resultado del servicio con la función del Hook useState
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
          
      } , [props.idProduct]);   


       const removeMaintenance = (  id : number, idProduct : number) => {
        Swal.fire({
            title: '¿Desea eliminar el mantenimiento?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {            
            if (result.isConfirmed) {
              MaintenanceService.remove(idProduct , id)
              .then((response: any) => {              
                showAlert('¡Correcto!', 'Mantenimiento eliminado correctamente');
              })
              .catch((e: Error) => {
                showErrorAlert('¡Error!', 'Error al intentar borrar');
                console.log(e);
              });      
            }
          });        
     }; 

    return ( 
        <div className='list row'>
            <h4>Mantenimientos</h4>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>
                            <Link to={"/products/" + props.idProduct + "/maintenances/create"} className="btn btn-success">
                                <FaPlus /> Agregar
                            </Link>                             
                            </th>
                            <th>  
                            </th>                          
                        </tr>
                    </thead>
                    <tbody> 
                        { maintenances && maintenances.map((Maintenance, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{Maintenance.name}</td>
                                <td>{Maintenance.description}</td>
                                <td>
                                <div className="btn-group" role="group">
                                <Link to={"/products/" + props.idProduct + "/maintenances/retrieve/" + Maintenance.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                  
                                  <Link to={"/products/" + props.idProduct + "/maintenances/update/" + Maintenance.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>

                                  <button className="btn btn-danger" onClick={()=> removeMaintenance(Maintenance.id! ,  props.idProduct)}>
                                    <FaTrash /> Eliminar
                                  </button>

                                  
                                </div>                        

                                </td>
                            </tr>
                        ))}             
                    </tbody>
                </table>

                
            </div>            
        </div>
     );

}