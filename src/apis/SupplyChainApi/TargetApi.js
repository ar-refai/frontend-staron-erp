import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllProcurementnRate= async () => {
    try {
      const response = await instance.get('/control/scTarget/ProcurementnRate');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllQutationTarget= async () => {
    try {
      const response = await instance.get('/sales/Target/Qutationscore');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllConversionTarget= async () => {
    try {
      const response = await instance.get('/sales/Target/Conversionscore');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };