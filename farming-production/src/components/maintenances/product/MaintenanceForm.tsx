import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IMaintenanceModel from "../../../models/Maintenance";
import IProductModel from "../../../models/Product";
import MaintenanceService from "../../../services/MaintenanceServices";
import ProductService from "../../../services/ProductServices";

export const MaintenanceForm = () => {
	
  //Obtener producto IdProduct 

  const { idProduct}= useParams();
  const [product, setProduct] = useState<IProductModel>();
  useEffect(() => {
    if (idProduct)
      getProduct(idProduct);
  }, [idProduct]);


  const getProduct = (id: any) => {
    ProductService.retrieve(id)
      .then((response: any) => {
        setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

  const { id }= useParams();
  let navigate = useNavigate();

    //Model vacío
    const initialMaintenanceModel : IMaintenanceModel = {
        id: null,
        name : "",
        description : "",
        date : "",
        amount : "", 
        state  : ""   
    };

    //Hooks para gestionar el modelo
    const [maintenance, setMaintenance] = useState<IMaintenanceModel>(initialMaintenanceModel);


    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMaintenance({ ...maintenance, [name]: value });
    };


    const saveProduct = (idProduct : any ) => {        
   /*    if(maintenance.id !== null)
      {
        MaintenanceService.update(idProduct, maintenance)
        .then((response: any) => {
          navigate("/products");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      { */
			  MaintenanceService.create(idProduct , maintenance)
          .then((response: any) => {    
            navigate("/products");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    };

    useEffect(() => {
      if (id)
      getMaintenance(idProduct , id);
    }, [id]);


    const getMaintenance = (idProduct : any  , id: any) => {
      MaintenanceService.retrieve(idProduct ,id)
        .then((response: any) => {
          setMaintenance(response.data); //Víncula el resultado del servicio con la función del Hook useState
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
   };


		return ( //JSX
			<div className="submit-form">				
					<div>
						{ maintenance.id !== null ? (<h1>Actualizado mantenimiento {maintenance.name}</h1>) : (<h1>Registro de mantenimiento</h1>) }            
						<div className="form-group">
						<label htmlFor="name">Name</label>
            <input
              type="text"
							placeholder="Ingrese el nombre del producto"
              className="form-control"
              id="name"
              required
              value={maintenance.name}
              onChange={handleInputChange}
              name="name"
            />
						<label htmlFor="description">Descripción</label>
            <input						
              type="date"
              className="form-control"
							placeholder="Ingrese la descripción del producto"
              id="date"
              required
              value={maintenance.date}
              onChange={handleInputChange}
              name="date"
            />
                        <label htmlFor="category">Cantidad</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la cantidad del producto"
              id="amount"
              required
              value={maintenance.amount}
              onChange={handleInputChange}
              name="amount"
            />
		
						<label htmlFor="amount">Estado</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la cantidad del producto"
              id="state"
              required
              value={maintenance.state}
              onChange={handleInputChange}
              name="state"
            />
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/products/retrieve/" +idProduct} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={saveProduct} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}