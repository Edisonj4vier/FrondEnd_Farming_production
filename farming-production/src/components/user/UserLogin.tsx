import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUserModel from "../../models/User";
import UserService from "../../services/UserServices";
import formulario from "../../styles/Home.module.css";

const initialUserModel: IUserModel = {
  name: "",
  password: "",
};

export const UserLogin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUserModel>(initialUserModel);

  //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginUser = () => {
    UserService.login(user)
      .then(() => {
        if (localStorage.getItem("token")) {
          navigate("/products");
        } else {
          navigate("/users/login");
        }
      })
      .catch(() => {
        console.log("Ha ocurrido un error");
      });
  };
  return (
    <section className={formulario.contenedor}>
      <div>
        <h2>Bienvenido!</h2>

        <form className={formulario.main__form}>
          <input
            type="text"
            placeholder="Ingrese el Usuario"
            className={formulario.main__input}
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className={formulario.main__input}
            value={user.password}
            name="password"
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={loginUser}
            className={formulario.main__input}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};
