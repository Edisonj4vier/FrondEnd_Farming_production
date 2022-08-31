import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import IProductModel from "../../models/Product";
import ISupplyModel from "../../models/Supply";
import ProductService from "../../services/ProductServices";
import SupplyService from "../../services/SupplyServices";



export const SupplyCard = () => {
  const { id, idProduct } = useParams();

  //Hooks para gestionar el modelo
  const [supply, setSupply] = useState<ISupplyModel>();
  const [product, setProduct] = useState<IProductModel>();

  useEffect(() => {
    if (idProduct) {
      ProductService.retrieve(+idProduct)
        .then((response: any) => {
          setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
          supply!.product = product!;
          //console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    if (id && idProduct) {
      SupplyService.retrieve(+idProduct, +id)
        .then((response: any) => {
          setSupply(response.data); //Víncula el resultado del servicio con la función del Hook useState
          supply!.product = product!;
          //console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [product, supply, id, idProduct]);

  return (
    <div>
      {supply ? (
        <div>
          <h2>{supply.name}</h2>
          <p>{supply.description}</p>
          <p>{supply.amount}</p>
          <br />
          <div className="btn-group" role="group">
            <Link
              to={`/products/retrieve/${idProduct}`}
              className="btn btn-primary"
            >
              <FaArrowLeft /> Volver
            </Link>

            <Link to={"/products/" + idProduct + "/supplies/"+id +"/create"} className="btn btn-success">
                    <FaArrowLeft /> Agregar Insumos
                </Link>

          </div>
        </div>
      ) : (
        <h1>No hay un insumo activo</h1>
        
      )}
    </div>
  );
};
