import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";

export const ProductForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //Model vacío
  const initialProductModel: IProductModel = {
    id: null,
    name: "",
    description: "",
    category: "",
    amount: 100,
    date: "",
  };

  //Hooks para gestionar el modelo
  const [product, setProduct] = useState<IProductModel>(initialProductModel);

  //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    if (product.id !== null) {
      ProductService.update(product)
        .then((response: any) => {
          navigate("/products");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      ProductService.create(product)
        .then((response: any) => {
          navigate("/products");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (id) {
      ProductService.retrieve(+id) //Transforma de number a String
        .then((response: any) => {
          setProduct(response.data); //Víncula el resultado del servicio con la función del Hook useState
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [id]);

  //Product Category
  const categoryProduct = [
    { label: "Cereal", value: "Cereal" },
    { label: "Leguminosas", value: "Leguminosas" },
    { label: "Hortalizas", value: "Hortalizas" },
    { label: "Frutales", value: "Frutales" },
    { label: "Ornamentales", value: "Ornamentales" },
    { label: "Raices y tuberculos", value: "Raices y tuberculos" },
    { label: "Medicinales", value: "Medicinales" },
    { label: "Pastos", value: "Pastos" },
  ];

  let index = 0 ; 

  return (
    //JSX
    <div className="submit-form">
      <div >
        {product.id !== null ? (
          <h1>Actualizado producto {product.name}</h1>
        ) : (
          <h1>Registro de nuevo producto</h1>
        )}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del producto"
            className="form-control"
            id="name"
            required
            value={product.name}
            onChange={handleInputChange}
            name="name"
          />

          <Box sx={{ minWidth: 120 }} key={index++}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Descripcion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.description}
                label="description"
                onChange={handleSelectChange}
                name="description"
              >
                <MenuItem value={"Semilla"}>Semilla</MenuItem>
                <MenuItem value={"Planta"}>Planta</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }} key={index++}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.category}
                label="Category"
                onChange={handleSelectChange}
                name="category"
              >
                {categoryProduct &&
                  categoryProduct.map((product) => (
                    <MenuItem value={product.value}>{product.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          <label htmlFor="amount">Cantidad</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese la cantidad del producto"
            id="amount"
            min={100}
            max={10000}
            required
            value={product.amount}
            onChange={handleInputChange}
            name="amount"
          />

          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            className="form-control"
            placeholder="Ingrese la fecha"
            id="date"
            required
            value={product.date}
            onChange={handleInputChange}
            name="date"
          />

          <br />
          <div className="btn-group" role="group">
            <Link to={"/products"} className="btn btn-primary">
              <FaArrowLeft /> Volver
            </Link>
            <button
              type="button"
              onClick={saveProduct}
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
