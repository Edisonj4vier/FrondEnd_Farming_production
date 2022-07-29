import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import IMaintenenceModel from "../../models/Maintenence";
import MaintenenceService from "../../services/MaintenenceService";

export const MaintenenceCard = () => {
  const { id } = useParams();

  const [maintenence, setMaintenence] = useState<IMaintenenceModel>();

  useEffect(() => {
    if (id) getMaintenence(id);
  }, [id]);

  const getMaintenence = (id: any) => {
    MaintenenceService.retrieve(id)
      .then((response: any) => {
        setMaintenence(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {maintenence ? (
        <div>
          <h2>{maintenence.name}</h2>
          <p>{maintenence.description}</p>
          <p>{maintenence.date.getDate()}</p>
          <p>{maintenence.amount}</p>
          <p>{maintenence.state}</p>
          <br />
          <div className="btn-group" role="group">
            <Link to={"/maintenance"} className="btn btn-primary">
              <FaArrowLeft /> Volver
            </Link>
            <button type="button" className="btn btn-danger">
              <FaTrash />
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <h1>No hay un mantenimiento activo</h1>
      )}
    </div>
  );
};
