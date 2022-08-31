import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { showAlert, showErrorAlert } from "../../common/alerts";
import ISupplyModel from "../../models/Supply";
import SupplyService from "../../services/SupplyServices";

type AppProps = {
  idProduct: number;
};

export const SupplyList = (props: AppProps) => {
  const [supplies, setSupplies] = useState<Array<ISupplyModel>>([]);

  useEffect(() => {
    SupplyService.list(props.idProduct)
      .then((response: any) => {
        setSupplies(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [props.idProduct]);

  const removeSupply = (id: number, idProduct: number) => {
    Swal.fire({
      title: "¿Desea eliminar el insumo?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        SupplyService.remove(idProduct, id)
          .then((response: any) => {
            showAlert("¡Correcto!", "Insumo eliminado correctamente");
            window.location.reload();
          })
          .catch((e: Error) => {
            showErrorAlert("¡Error!", "Error al intentar borrar");
            console.log(e);
          });
      }
    });
  };

  return (
    <div className="list row">
      <h4>Insumos</h4>
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>

              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {supplies &&
              supplies.map((Supply, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{Supply.name}</td>
                  <td>{Supply.description}</td>
                  <td>{Supply.amount}</td>

                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={
                          "/products/" +
                          props.idProduct +
                          "/supplies/retrieve/" +
                          Supply.id
                        }
                        className="btn btn-warning"
                      >
                        <FaEye /> Ver
                      </Link>
                      <Link
                        to={
                          "/products/" +
                          props.idProduct +
                          "/supplies/update/" +
                          Supply.id
                        }
                        className="btn btn-primary"
                      >
                        <FaPen /> Editar
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeSupply(Supply.id!, props.idProduct)
                        }
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
