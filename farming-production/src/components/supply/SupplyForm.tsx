import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProductModel from "../../models/Product";
import ISupplyModel from "../../models/Supply";
import ProductService from "../../services/ProductServices";
import supplyService from "../../services/SupplyServices";


export const ProductForm = () => {
	
  //Obtener producto IdProduct 

  const { idProduct}= useParams();
  const [product, setProduct] = useState<IProductModel>();
  useEffect(() => {
    if (idProduct)
      getProduct(idProduct);
  }, [idProduct]);


  const getProduct = (idProduct: any) => {
    ProductService.retrieve(idProduct)
      .then((response: any) => {
        setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

 //Obtener el idMaintenance 

 const { idMaintenance}= useParams();
 const [maintenance, setMaintenance] = useState<IProductModel>();
 useEffect(() => {
   if (idMaintenance)
     getMaintenance(idMaintenance);
 }, [idMaintenance]);


 const getMaintenance = (idMaintenance: any) => {
   ProductService.retrieve(idMaintenance)
     .then((response: any) => {
      setMaintenance(response.data); //Víncula el resultado del servicio con la función del Hook useState
       console.log(response.data);
     })
     .catch((e: Error) => {
       console.log(e);
     });
};

 ///

  let navigate = useNavigate();

    //Model vacío
    const initialMaintenanceModel : ISupplyModel = {
        id: null,
        name : "" ,
     description : "" ,
     amount : "" ,
     expericionDate : "" 
    };

    //Hooks para gestionar el modelo
    const [supply, setSupply] = useState<ISupplyModel>(initialMaintenanceModel);


    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSupply({ ...supply, [name]: value });
    };


    const saveSupply = (idProduct : any , idMaintenance : any ) => {        
			  supplyService.create(idProduct  , idMaintenance , supply)
          .then((response: any) => {    
            navigate("/products");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    };



		return ( //JSX
			<div className="submit-form">				
					<div>
						{ supply.id !== null ? (<h1>Actualizado mantenimiento {supply.name}</h1>) : (<h1>Registro de nuevo insumo</h1>) }            
						<div className="form-group">
						<label htmlFor="name">Name</label>
            <input
              type="text"
							placeholder="Ingrese el nombre del producto"
              className="form-control"
              id="name"
              required
              value={supply.name}
              onChange={handleInputChange}
              name="name"
            />
						<label htmlFor="description">Descripción</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la descripción del producto"
              id="description"
              required
              value={supply.description}
              onChange={handleInputChange}
              name="description"
            />
                        <label htmlFor="category">Cantidad</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la cantidad del producto"
              id="amount"
              required
              value={supply.amount}
              onChange={handleInputChange}
              name="amount"
            />
		
						<label htmlFor="amount">Estado</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la cantidad del producto"
              id="expericionDate"
              required
              value={supply.expericionDate}
              onChange={handleInputChange}
              name="expericionDate"
            />
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/products/retrieve/" +idProduct +"/" + idMaintenance} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={() => saveSupply(idProduct , idMaintenance)} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}