import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";

const title = "Farming Production";
const description = "Aplicación web para el control de productos agricolas";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">        
        <Link to={"/"}  className="navbar-brand">
          NRC 6515
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/exams"} className="nav-link">
              Productos
            </Link>
          </li>          
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} />          
        </Routes>
      </div>
    </div>
  );
}
export default App;
