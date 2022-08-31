import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import IUserModel from "../models/User";
import IUserTokenModel from "../models/UserToken";

const login = async (data : IUserModel) => {    
  const url : string = `/users/login`;
  return await http.post<IUserTokenModel>(url, data).then((response)=> {
    localStorage.setItem("token" , response.data.token);
    showAlert('¡Correcto!', 'Usuario acreditado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'Usuario no acreditado');
  });  
};

const UserService = {
  login 
};
export default UserService;