import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'https://erpsystem.darakoutlet.com/api/v1/control', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllEmployee = async () => {
    try {
      const response = await instance.get('/procurment');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showEmployee = async (id) => {
    try {
      const response = await instance.get('/procurment/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteEmployee = async (id) => {
    try {
      const response = await instance.delete('/procurment/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const AcceptEmployee = async (id) => {
    try {
      const response = await instance.post('/procurment/'+id+"/aprove");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const AcceptfromOperation = async (id) => {
    try {
      const response = await instance.post('/procurment/'+id+"/AcceptfromOperation");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const RejectEmployee = async (id) => {
    try {
      const response = await instance.post('/procurment/'+id+"/reject");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateEmployee = async (formdata) => {
    try {
      const response = await instance.post('/procurment/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateEmployees = async (formdata , id) => {
    try {
      const response = await instance.post('/procurment/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };