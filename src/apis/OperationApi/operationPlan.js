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
export const ShowAllEmployee = async () => {
    try {
      const response = await instance.get('/control/operationplan');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showEmployee = async (id) => {
    try {
      const response = await instance.get('/control/operationplan/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteEmployee = async (id) => {
    try {
      const response = await instance.delete('/control/operationplan/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateEmployee = async (formdata) => {
    try {
      const response = await instance.post('/control/operationplan/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateEmployees = async (formdata , id) => {
    try {
      const response = await instance.post('/control/operationplan/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };