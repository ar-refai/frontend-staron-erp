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
export const ShowAllCategoryData = async () => {
    try {
      const response = await instance.get('/category');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowCategoryData = async (id) => {
    try {
      const response = await instance.get('/category/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateCategoryData = async (formdata) => {
    try {
      const response = await instance.post('/category/create',formdata);
      return response;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateCategoryData = async (id,formdata) => {
    try {
      const response = await instance.post('/category/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };