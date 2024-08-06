import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'https://erpsystem.darakoutlet.com/api/v1/SupplyChain', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllstockData = async () => {
    try {
      const response = await instance.get('/stock');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowstockData = async (id) => {
    try {
      const response = await instance.get('/stock/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreatestockData = async (formdata) => {
    try {
      const response = await instance.post('/stock/create',formdata);
      return response;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdatestockData = async (id,formdata) => {
    try {
      const response = await instance.post('/stock/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };