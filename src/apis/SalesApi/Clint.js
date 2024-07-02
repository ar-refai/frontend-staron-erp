import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'https://erpsystem.darakoutlet.com/api/v1/sales', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});


  export const ShowAllClint = async () => {
    try {
      const response = await instance.get('/Clint');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showClint = async (id) => {
    try {
      const response = await instance.get('/Clint/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteClint = async (id) => {
    try {
      const response = await instance.delete('/Clint'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateClint = async (formdata) => {
    try {
      const response = await instance.post('/Clint/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdatClint = async (id,formdata) => {
    try {
      const response = await instance.post('/Clint/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  