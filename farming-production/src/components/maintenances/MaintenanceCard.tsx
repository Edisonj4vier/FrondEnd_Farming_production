import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import IMaintenanceModel from "../../models/Maintenance";
import IProductModel from "../../models/Product";
import MaintenanceService from "../../services/MaintenanceServices";
import ProductService from "../../services/ProductServices";



export const MaintenanceCard = () => {
  const { id, idProduct } = useParams();

  //Hooks para gestionar el modelo
  const [maintenance, setMaintenance] = useState<IMaintenanceModel>();
  const [product, setProduct] = useState<IProductModel>();

  useEffect(() => {
    if (idProduct) {
      ProductService.retrieve(+idProduct)
        .then((response: any) => {
          setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
          maintenance!.product = product!;
          //console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    if (id && idProduct) {
      MaintenanceService.retrieve(+idProduct, +id)
        .then((response: any) => {
          setMaintenance(response.data); //Víncula el resultado del servicio con la función del Hook useState
          maintenance!.product = product!;
          //console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [product, maintenance, id, idProduct]);

  return (
    <div>
      {maintenance ? (
        <div>
          <h2>{maintenance.name}</h2>
          <p>{maintenance.description}</p>
          <p>{maintenance.date}</p>
          <br />
          <div className="btn-group" role="group">
            <Link
              to={`/products/retrieve/${idProduct}`}
              className="btn btn-primary"
            >
              <FaArrowLeft /> Volver
            </Link>

            <Link to={"/products/" + idProduct + "/maintenances/"+id +"/create"} className="btn btn-success">
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
