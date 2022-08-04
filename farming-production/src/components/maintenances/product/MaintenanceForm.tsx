import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IMaintenanceModel from "../../../models/Maintenance";
import IProductModel from "../../../models/Product";
import MaintenanceService from "../../../services/MaintenanceServices";
import ProductService from "../../../services/ProductServices";

export const MaintenanceForm = () => {

  const { id, idProduct }= useParams();
  let navigate = useNavigate();


//Model vacío
const initialQuestionModel : IMaintenanceModel = {
    id: null,
    name: "",
    description: "", 
    amount : "" , 
    date: "",  
    state : "", 
    product : null    
};

//Hooks para gestionar el modelo
const [maintenance, setMaintenance] = useState<IMaintenanceModel>(initialQuestionModel);
const [product, setProduct] = useState<IProductModel>();

//Escucha los cambios en cada control Input y los asigna a los valores del Modelo
const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMaintenance({ ...maintenance, [name]: value });
};

useEffect(() => {
  if (idProduct)
  getProduct(idProduct);
});

const getProduct = (id: any) => {
  ProductService.retrieve(id)
    .then((response: any) => {
      setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
      maintenance.product = product!;
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

const saveMaintenance = () => {        
    if(maintenance.id !== null)
    {
      /*QuestionService.update(exam)
      .then((response: any) => {
        navigate("/exams");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });*/
    }
    else
    {
        MaintenanceService.create(maintenance)
        .then((response: any) => {    
          navigate("/products");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

return ( //JSX
	<div className="submit-form">				
		<div>
				{ maintenance.id !== null ? (<h1>Actualizado la pregunta {maintenance.name}</h1>) : (<h1>Registro de nueva pregunta</h1>) }            
        { product ? (<h3>{product.name} </h3>) : (<h3>N/A</h3>) }
						<div className="form-group">
						<label htmlFor="title">Título</label>
            <input
              type="text"
							placeholder="Ingrese el nombre de la pregunta"
              className="form-control"
              id="name"
              required
              value={maintenance.name}
              onChange={handleInputChange}
              name="name"
            />
						<label htmlFor="description">Descripción</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la descripción del examen"
              id="description"
              required
              value={maintenance.description}
              onChange={handleInputChange}
              name="description"
            />
						<label htmlFor="timeLimit">Puntaje</label>
            <input						
              type="text"
              className="form-control"
              id="date"
              required
              value={maintenance.date}
              onChange={handleInputChange}
              name="date"
            />
			
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/products"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={saveMaintenance} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );
}