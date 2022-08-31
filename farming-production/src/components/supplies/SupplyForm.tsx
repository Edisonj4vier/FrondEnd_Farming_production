import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProductModel from "../../models/Product";
import ISupplyModel from "../../models/Supply";
import ProductService from "../../services/ProductServices";
import SupplyService from "../../services/SupplyServices";

export const SupplyForm = () => {
  const { id, idProduct } = useParams();
  let navigate = useNavigate();

  //Model vacío
  const initialSupplyModel: ISupplyModel = {
    id: null,
    name: "",
    description: "",
    amount: "",
    product: null,
  };

  //Hooks para gestionar el modelo
  const [supply, setSupply] = useState<ISupplyModel>(initialSupplyModel);
  const [product, setProduct] = useState<IProductModel>();

  //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSupply({ ...supply, [name]: value });
  };

  useEffect(() => {
    if (idProduct) {
      ProductService.retrieve(+idProduct)
        .then((response: any) => {
          setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    if (id && idProduct) {
      SupplyService.retrieve(+idProduct, +id)
        .then((response: any) => {
          setSupply(response.data); //Víncula el resultado del servicio con la función del Hook useState
          supply.product = product!;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [id, idProduct]);

  const saveSupply = () => {
    if (supply.id !== null) {
      SupplyService.update(supply)
        .then((response: any) => {
          navigate(`/products/retrieve/${product!.id}`);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      supply.product = product!;
      SupplyService.create(supply)
        .then((response: any) => {
          navigate(`/products/retrieve/${product!.id}`);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  return (
    //JSX
    <div className="submit-form">
      <div>
        {supply.id !== null ? (
          <h1>Actualizado el insumo de {supply.name}</h1>
        ) : (
          <h1>Registro de nuevo insumo de {product ? product.name : "N/A"} </h1>
        )}

        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del mantenimiento"
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
            placeholder="Ingrese la descripción del Producto"
            id="description"
            required
            value={supply.description}
            onChange={handleInputChange}
            name="description"
          />
          <label htmlFor="amount">Cantidad</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese la cantidad del producto"
            id="amount"
            min={10}
            max={10000}
            required
            value={supply.amount}
            onChange={handleInputChange}
            name="amount"
          />

          <div className="btn-group" role="group">
            <Link
              to={`/products/retrieve/${idProduct}`}
              className="btn btn-primary"
            >
              <FaArrowLeft /> Volver
            </Link>
            <button
              type="button"
              onClick={saveSupply}
              className="btn btn-success"
            >
              <FaSave />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
