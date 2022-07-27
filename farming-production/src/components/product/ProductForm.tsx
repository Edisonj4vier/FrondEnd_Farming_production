import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";

export const ProductForm = () => {
	
  const { id }= useParams();
  let navigate = useNavigate();

    //Model vacío
    const initialProductModel : IProductModel = {
        id: null,
        name: "",
        description: "",
        category: "",
        amount: 0
    };

    //Hooks para gestionar el modelo
    const [product, setProduct] = useState<IProductModel>(initialProductModel);
    
    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };


    const saveProduct = () => {        
      if(product.id !== null)
      {
        ProductService.update(product)
        .then((response: any) => {
          navigate("/products");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
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


		return ( //JSX
			<div className="submit-form">				
					<div>
						{ product.id !== null ? (<h1>Actualizado producto {product.name}</h1>) : (<h1>Registro de nuevo producto</h1>) }            
						<div className="form-group">
						<label htmlFor="name">Name</label>
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
						<label htmlFor="description">Descripción</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la descripción del producto"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
                        <label htmlFor="category">Categoria</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la cantidad del producto"
              id="category"
              required
              value={product.category}
              onChange={handleInputChange}
              name="category"
            />
		
						<label htmlFor="amount">Cantidad</label>
            <input						
              type="number"
              className="form-control"
							placeholder="Ingrese la cantidad del producto"
              id="amount"
              required
              value={product.amount}
              onChange={handleInputChange}
              name="amount"
            />
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/products"} className="btn btn-primary">
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