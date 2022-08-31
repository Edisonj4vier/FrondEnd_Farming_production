import { showAlert, showErrorAlert } from '../common/alerts';
import http from '../http-common';
import IMaintenanceModel from '../models/Maintenance';
import ISupplyModel from '../models/Supply';


 /* ================ CREATE ================ */
const create = async (dataMaintenance :  IMaintenanceModel,  dataSupply :  ISupplyModel) => {    
  //console.log(data);
    const url : string = `/products/${dataMaintenance.product!.id}/maintenances/${dataSupply.maintenance!.id}/supplies`;
    http.post<ISupplyModel>(url,  {headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }}).then((response)=> {
      console.log(response);
      showAlert('¡Correcto!', 'Mantenimiento agregado correctamente');
    }).catch((err) => {
      console.error(err);
      showErrorAlert('¡Error!', 'El mantenimiento no pudo ser agregado');
    });
};


const SupplyService = {
  create,

  
};
export default SupplyService;