import IProductModel from "./Product";

export default interface IMaintenanceModel {
    id?: number | null,
    name : string,
    description : string,
    date : string,
    amount : string, 
    state  : string   , 
    product : IProductModel | null 
}
