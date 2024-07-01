import axios from 'axios';
const token=  localStorage.getItem('token');
const instance = axios.create({
  baseURL: 'https://erpsystem.darakoutlet.com/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllPayroll = async () => {
    try {
      const response = await instance.get('/payroll');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteEmployee = async (id) => {
    try {
      const response = await instance.delete('/payroll/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateEmployee = async (formdata) => {
    try {
      const response = await instance.post('/payroll/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateEmployees = async (formdata , id) => {
    try {
      const response = await instance.post('/payroll/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };