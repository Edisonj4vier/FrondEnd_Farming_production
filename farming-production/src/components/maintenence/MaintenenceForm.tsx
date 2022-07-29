import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IMaintenenceModel from "../../models/Maintenence";
import MaintenenceService from "../../services/MaintenenceService";

export const MaintenenceForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //Model vacío
  const initialMaintenenceModel: IMaintenenceModel = {
    id: null,
    name: "",
    description: "",
    date: new Date(),
    amount: 0,
    state: "",
  };

  //Hooks para gestionar el modelo
  const [maintenence, setMaintenence] = useState<IMaintenenceModel>(
    initialMaintenenceModel
  );

  //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMaintenence({ ...maintenence, [name]: value });
  };

  const saveMaintenece = () => {
    if (maintenence.id !== null) {
      MaintenenceService.update(maintenence)
        .then((response: any) => {
          navigate("/maintenance");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      MaintenenceService.create(maintenence)
        .then((response: any) => {
          navigate("/maintenance");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

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
    //JSX
    <div className="submit-form">
      <div>
        {maintenence.id !== null ? (
          <h1>Actualizado mantenimiento {maintenence.name}</h1>
        ) : (
          <h1>Registro de nuevo mantenimiento</h1>
        )}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del mantenimiento"
            className="form-control"
            id="name"
            required
            value={maintenence.name}
            onChange={handleInputChange}
            name="name"
          />
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese la descripción del mantenimiento"
            id="description"
            required
            value={maintenence.description}
            onChange={handleInputChange}
            name="description"
          />
          <label htmlFor="category">Fecha de creacion</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese la fecha de creacion del mantenimiento"
            id="date"
            required
            value={maintenence.date.getDate()}
            onChange={handleInputChange}
            name="date"
          />

          <label htmlFor="amount">Cantidad</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese la cantidad de mantenimiento"
            id="amount"
            required
            value={maintenence.amount}
            onChange={handleInputChange}
            name="amount"
          />
            <label htmlFor="state">Estado</label>
            <input
            type="text"
            className="form-control"
            placeholder="Ingrese el estado del mantenimiento"
            id="state"
            required
            value={maintenence.state}
            onChange={handleInputChange}
            name="state"
          />
            
          <br />
          <div className="btn-group" role="group">
            <Link to={"/maintenance"} className="btn btn-primary">
              <FaArrowLeft /> Volver
            </Link>
            <button
              type="button"
              onClick={saveMaintenece}
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
