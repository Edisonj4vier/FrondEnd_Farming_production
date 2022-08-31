import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";
import { MaintenanceList } from "../maintenances/MaintenanceList";

export const ProductCard = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProductModel>();
  useEffect(() => {
    if (id){
      ProductService.retrieve(+id)
      .then((response: any) => {
        setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
        <div className="card">
         {/*  <img src={product.amount} className="card-img-top" alt="..." />
          */} <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">Descripcion: {product.description}</p>
            <p className="card-text">Categoria: {product.category}</p>
            <p className="card-text">Cantidad: {product.amount} plantas</p>
            <p className="card-text"><small className="text-muted">{product.date}</small></p>
            <div className="btn-group" role="group">
            <Link to={"/products"} className="btn btn-primary">
              <FaArrowLeft /> Volver
            </Link>

            <Link to={"/products/" + product.id + "/maintenances/create"} className="btn btn-success">
                    <FaArrowLeft /> 
                    
                    Agregar Mantenimientos
                </Link>

            
          </div>
          </div>
          
       
        </div>

          <div>
          <MaintenanceList idProduct={product.id!}/>
          </div>
        </div>
      ) : (
        <h1>No hay un producto activo</h1>
      )}
    </div>
  );
};
