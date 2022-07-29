import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { ProductList } from "./components/product/ProductList";
import { ProductForm } from "./components/product/ProductForm";
import { ProductCard } from "./components/product/ProductCard";
import { MaintenenceLsit } from "./components/maintenence/MaintenenceList";
import { MaintenenceForm } from "./components/maintenence/MaintenenceForm";
import { MaintenenceCard } from "./components/maintenence/MaintenenceCard";

import {MaintenanceForm} from './components/maintenances/product/MaintenanceForm'

const title = "Farming Production";
const description = "Aplicación web para el control de productos agricolas";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">        
        <Link to={"/"}  className="navbar-brand">
          FARMING
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Productos
            </Link>
          </li>    
          <Link to={"/maintenance"} className="nav-link">
              Mantenimientos
            </Link>     
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} />
          {/* Rutas de products */} 
          <Route path="/products" element={<ProductList />} />          
          <Route path="/products/create" element={<ProductForm />} />    
          <Route path="/products/retrieve/:id" element={<ProductCard/>} />      
<<<<<<< HEAD
          <Route path="/products/update/:id" element={<ProductForm />} />      
          //Maintenence
          <Route path="/maintenance" element={<MaintenenceLsit />} />          
          <Route path="/maintenance/create" element={<MaintenenceForm />} />    
          <Route path="/maintenance/retrieve/:id" element={<MaintenenceCard/>} />      
          <Route path="/maintenance/update/:id" element={<MaintenenceForm />} />     
=======
          <Route path="/products/update/:id" element={<ProductForm />} /> 

          {/* Rutas de products */} 
          <Route path="/products/maintenance/create" element={<MaintenanceForm />} />    
          <Route path="/products/retrieve/:id" element={<ProductCard/>} />      
          <Route path="/products/maintenance/update/:id" element={<MaintenanceForm />} />    
          
          

>>>>>>> 51fe4587ff3e2e71effbb9aad1ffc2101d43c364
        </Routes>
      </div>
    </div>
  );
}
export default App;
