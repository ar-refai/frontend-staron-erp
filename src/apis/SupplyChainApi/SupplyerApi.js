import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1/SupplyChain', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllSupplyerData = async () => {
    try {
      const response = await instance.get('/supplyer');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowSupplyerData = async (id) => {
    try {
      const response = await instance.get('/supplyer/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateSupplyerData = async (formdata) => {
    try {
      const response = await instance.post('/supplyer/create',formdata);
      return response;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateSupplyerData = async (id,formdata) => {
    try {
      const response = await instance.post('/supplyer/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };