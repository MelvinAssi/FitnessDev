import { createContext, useState ,useEffect} from 'react';
import axios from "../services/axios.js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  
  useEffect(() => { 
      const localToken = localStorage.getItem('token');
      if(localToken){
        const testToken = async () => {
          try {
            const profil = await fetchprofil();
            const decodedUser = jwtDecode(localToken);
            setUser(decodedUser);
            setToken(localToken);
            console.log('Profil:', profil);
          } catch (error) {
            logout();
          }
        };
        testToken();
      }
  }, []);
  



  const signup =async(data)=>{
    console.log(data)
    try{
      const response = await axios.post('/auth/signup', {
        email_inscrit: data.email,
        mdp_inscrit: data.password,        
        nom_inscrit: data.name,
        prenom_inscrit: data.firstname,
        adresse_inscrit: data.adress,
        telephone_inscrit: data.phone,        
        type_inscrit: "client",
        id_abonnement: null
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
    }catch{
      console.error('Signup error:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email_inscrit: email,
        mdp_inscrit: password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  const fetchprofil = async () => {
    try {
      const response = await axios.get('/user/profil');
      return response.data.user;
    } catch (error) {
      console.error('Erreur fetchprofil:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user,token, signup, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
