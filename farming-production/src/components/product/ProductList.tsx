import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IProductModel from "../../models/Product";
import ProductService from "../../services/ProductServices";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Dropdown from "react-dropdown";
import { showAlert, showErrorAlert } from "../../common/alerts";

export const ProductList = () => {
  //Hook: Define un atributo y la función que lo va a actualizar
  const [products, setProducts] = useState<Array<IProductModel>>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<string>("5");
  const [numberPage, setNumberPage] = useState<number>(0);

  //Hook metodo de busqueda

  const [busqueda, setBusqueda] = useState("");

  //Hook para llamar a la Web API
  useEffect(() => {
    ProductService.count()
      .then((response: any) => {
        var numberPerPage = parseInt(itemsPerPage);
        var itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount / numberPerPage));
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [itemsPerPage]); //???

  useEffect(() => {
    ProductService.list(numberPage, itemsPerPage)
      .then((response: any) => {
        setProducts(response.data); //Víncula el resultado del servicio con la función del Hook useState
        //console.log("Esto es de listProducts", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [itemsPerPage, numberPage, itemsCount]); // ???

  //Metodo de filtrado

  const obtenerProductos = (): IProductModel[] => {
    if (busqueda.length === 0)  return products;
    const filtro = products.filter((pro) =>
      pro.name.toString().toLowerCase().includes(busqueda.toLowerCase())
    );

    return filtro;
  };

  //Captar busqueda
  const handleChange = (e: any) => {
    setBusqueda(e.target.value);
  };

  const handlePageClick = (event: any) => {
    setNumberPage(event.selected);
  };

  const handleItemPerPageClick = (event: any) => {
    setItemsPerPage(event.value);
  };

  const removeProduct = (id: number) => {
    Swal.fire({
      title: "¿Desea eliminar el producto?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.remove(id)
          .then((response: any) => {
            var updatedItemsCount = itemsCount - 1;
            setItemsCount(updatedItemsCount);
            setPageCount(Math.ceil(updatedItemsCount / +itemsPerPage));
            showAlert("¡Correcto!", "Producto eliminado correctamente");
            window.location.reload();
          })
          .catch((e: Error) => {
            showErrorAlert("¡Error!", "Error al intentar borrar el producto");
            console.log(e);
          });
      }
    });
  };

  const options = ["5", "10", "15", "50"];

  return (
    <div className="list row">
      <h1>Productos existentes {itemsCount}</h1>
      <hr />

      <div>
        <input
          type="text"
          onChange={handleChange}
          value={busqueda}
          placeholder="Buscar"
          className="form-control"
        />
      </div>
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categorias</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>
                <Link to={"/products/create"} className="btn btn-success">
                  <FaPlus /> Agregar
                </Link>
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
            {obtenerProductos() &&
              obtenerProductos()?.map((Product, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{Product.name}</td>
                  <td>{Product.description}</td>
                  <td>{Product.category}</td>
                  <td>{Product.amount}</td>
                  <td>{Product.date}</td>
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
                        onClick={() => removeProduct(Product.id!)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination justify-content-center">
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
