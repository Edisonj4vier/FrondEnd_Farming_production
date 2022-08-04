import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Dropdown from "react-dropdown";

export const ProductList = () => {

  //Hook: Define un atributo y la función que lo va a actualizar
  const [products, setProducts] = useState<Array<IProductModel>>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<string>("5");
  const [numberPage, setNumberPage] = useState<number>(0);

  //Hook metodo de busqueda 

  const [busqueda , setBusqueda ] =  useState("")

  //Hook para llamar a la Web API
  useEffect(() => {
    getItems();
  });

  useEffect(() => {
    listProducts();
  } );

  //Metodo de filtrado

  const searchName=(terminoBusqueda: any) => {
    var resultadosBusqueda=products.filter((producto)=>{
      if(producto.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return producto;
      }
      else{
        return false ; 
      }
    });
    setProducts(resultadosBusqueda);
  }

  //Captar busqueda
  const handleChange = (e : any ) => {
    setBusqueda(e.target.value)
    console.log(e.target.value)
    searchName(e.target.value)
  }

  const handlePageClick = (event: any) => {
    setNumberPage(event.selected);
  };

  const handleItemPerPageClick = (event: any) => {
    setItemsPerPage(event.value);
  };

  //Función que llama al Service para listar los datos desde la Web API
  const listProducts = () => {
    ProductService.list(numberPage, itemsPerPage)
      .then((response: any) => {
        setProducts(response.data); //Víncula el resultado del servicio con la función del Hook useState
        //console.log("Esto es de listProducts", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getItems = async () => {
    await ProductService.count()
      .then((response: any) => {
        var numberPerPage = parseInt(itemsPerPage);
        var itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount / numberPerPage));
        //console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const removeExam = (id: number) => {
    Swal.fire({
      title: "¿Desea eliminar el producto?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.remove(id)
          .then((response: any) => {
            setNumberPage(0);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    });
  };

  const options = ["5", "10", "15"];

  return (
    <div className="list row">
      <h1>Hay {itemsCount} productos</h1> 
      <hr />

<div>
        <input type="text" onChange={handleChange} value = {busqueda} placeholder="Buscar" className="form-control"/>

     </div> 
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Categorias</th>
              <th>Cantidad</th>
              <th>
                <Link to={"/products/create"} className="btn btn-success">
                  <FaPlus /> Agregar
                </Link>
              </th>
              <th>
              
              </th>

              <th>
                <Dropdown
                  className="dropdown"
                  menuClassName="dropdown-menu dropdown-item"
                  placeholderClassName="btn btn-secondary dropdown-toggle"
                  options={options}
                  onChange={handleItemPerPageClick}
                  value={itemsPerPage}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((Product, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{Product.name}</td>
                  <td>{Product.description}</td>
                  <td>{Product.category}</td>
                  <td>{Product.amount}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={"/products/retrieve/" + Product.id}
                        className="btn btn-warning"
                      >
                        <FaEye /> Ver
                      </Link>
                      <Link
                        to={"/products/update/" + Product.id}
                        className="btn btn-primary"
                      >
                        <FaPen /> Editar
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => removeExam(Product.id!)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="container">
          <ReactPaginate
            activeClassName="page-item active"
            pageLinkClassName="page-link"
            containerClassName="pagination"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            breakLabel="..."
            nextLabel=">>"
            pageClassName="page-item"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel="<<"
          />
        </div>
      </div>
    </div>
  );
};
