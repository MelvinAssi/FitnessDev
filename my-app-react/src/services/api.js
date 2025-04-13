import axios from 'axios';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`https://api.example.com/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la requête API :', error);
    throw error;
  }
};