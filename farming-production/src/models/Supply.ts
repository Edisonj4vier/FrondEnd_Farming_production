import IMaintenanceModel from "./Maintenance";

export default interface ISupplyModel {
    id?: number | null,
     name : string ,
     description : string ,
     amount : string ,
     expericionDate : string , 
     maintenance : null | IMaintenanceModel;  
}
