import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IMaintenanceModel from "../../models/Maintenance";
import IProductModel from "../../models/Product";
import MaintenanceService from "../../services/MaintenanceServices";
import ProductService from "../../services/ProductServices";

export const MaintenanceForm = () => {
  const { id, idProduct } = useParams();
  let navigate = useNavigate();

  //Model vacío
  const initialQuestionModel: IMaintenanceModel = {
    id: null,
    name: "",
    description: "",
    amount: "",
    date: "",
    state: "",
    product: null,
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setMaintenance({ ...maintenance, [name]: value });
  };

  //Hooks para gestionar el modelo
  const [maintenance, setMaintenance] =
    useState<IMaintenanceModel>(initialQuestionModel);
  const [product, setProduct] = useState<IProductModel>();

  //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMaintenance({ ...maintenance, [name]: value });
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
      MaintenanceService.retrieve(+idProduct, +id)
        .then((response: any) => {
          setMaintenance(response.data); //Víncula el resultado del servicio con la función del Hook useState
          maintenance.product = product!;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [id, idProduct]);

  const saveMaintenance = () => {
    if (maintenance.id !== null) {
      MaintenanceService.update(maintenance)
        .then((response: any) => {
          navigate(`/products/retrieve/${product!.id}`);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      maintenance.product = product!;
      MaintenanceService.create(maintenance)
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
        {maintenance.id !== null ? (
          <h1>Actualizado el mantenimiento de {maintenance.name}</h1>
        ) : (
          <h1>
            Registro de nuevo mantenimiento de {product ? product.name : "N/A"}{" "}
          </h1>
        )}

        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del mantenimiento"
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
            placeholder="Ingrese la descripción del Producto"
            id="description"
            required
            value={maintenance.description}
            onChange={handleInputChange}
            name="description"
          />
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={maintenance.date}
            onChange={handleInputChange}
            name="date"
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maintenance.state}
                label="state"
                onChange={handleSelectChange}
                name="state"
              >
                <MenuItem value={"Activo"}>Activo</MenuItem>
                <MenuItem value={"Inactivo"}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div className="btn-group" role="group">
            <Link
              to={`/products/retrieve/${idProduct}`}
              className="btn btn-primary"
            >
              <FaArrowLeft /> Volver
            </Link>
            <button
              type="button"
              onClick={saveMaintenance}
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
