import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { ProductList } from "./components/product/ProductList";
import { ProductForm } from "./components/product/ProductForm";
import { ProductCard } from "./components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import { MaintenanceForm } from "./components/maintenances/MaintenanceForm";
import { MaintenanceCard } from "./components/maintenances/MaintenanceCard";
import { UserLogin } from "./components/user/UserLogin";
import { SupplyForm } from "./components/supplies/SupplyForm";
import { SupplyCard } from "./components/supplies/SupplyCard";


const title = "Farming Production";
const description = "Aplicación web para el control de productos agricolas";

const background = "https://img.freepik.com/vector-gratis/ilustracion-profesion-agricultura-plana-organica_23-2148899111.jpg?w=1060&t=st=1661907556~exp=1661908156~hmac=22a714f7ba25b2420f10e5c1acfd969023e35598028085ddc8b20f86154a08f8";
const containerSyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  width: '100%',
  height: '1080px',
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/users/login");
  };
  return (
    <div style={containerSyle}>
      <nav className="navbar navbar-expand navbar-dark bg-dark p-4">
        <Link to={"/"} className="navbar-brand">
          FARMING
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/users/login"} className="nav-link">
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <button className="btn btn-warning" onClick={logout}>
              Cerrar Sesion
            </button>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route
            path="/"
            element={<Home title={title} description={description} />}
          />
          <Route path="/users/login" element={<UserLogin />} />{" "}
          {/* Rutas de products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/retrieve/:id" element={<ProductCard />} />
          <Route path="/products/update/:id" element={<ProductForm />} />
          {/* Maintenances routes */}
          <Route
            path="/products/:idProduct/maintenances/create"
            element={<MaintenanceForm />}
          />
          <Route
            path="/products/:idProduct/maintenances/retrieve/:id"
            element={<MaintenanceCard />}
          />
          <Route
            path="/products/:idProduct/maintenances/update/:id"
            element={<MaintenanceForm />}
          />
          {/* Suplies routes */}
          <Route
            path="/products/:idProduct/supplies/create"
            element={<SupplyForm />}
          />
           <Route
            path="/products/:idProduct/supplies/retrieve/:id"
            element={<SupplyCard />}
          />
          <Route
            path="/products/:idProduct/supplies/update/:id"
            element={<SupplyForm />}
          /> 
        </Routes>
      </div>
    </div>
  );
};
export default App;
