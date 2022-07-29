export default interface IMaintenenceModel {
     id?: number | null,
     name: string;
     description: string;
     date: Date;
     amount: number;
     state: string; 
}
