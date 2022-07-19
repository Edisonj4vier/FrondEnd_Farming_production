import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link,useParams } from 'react-router-dom';
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";

export const ProductCard = () => {
  const { id }= useParams();

  const [product, setProduct] = useState<IProductModel>();

  useEffect(() => {
    if (id)
      getProduct(id);
  }, [id]);


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

    return (
      <div>
      { 
        product ? (
          <div>          
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.category}</p>
          <p>{product.amount}</p>
          <br />
							<div className="btn-group" role="group">								
                <Link to={"/product"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
							</div>
          </div>

        ) : 
        ( 
          <h1>No hay un producto activo</h1>
        )
      }
      </div>
    );
}