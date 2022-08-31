import IProductModel from "./Product";

export default interface ISupplyModel {
    id?: number | null,
     name : string ,
     description : string ,
     amount : string ,
     product : null | IProductModel;  
}
