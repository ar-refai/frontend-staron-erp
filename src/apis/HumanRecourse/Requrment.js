import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000//api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllRequestfe = async () => {
    try {
      const response = await instance.get('/Requirements');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showRequestfe = async (id) => {
    try {
      const response = await instance.get('/Requirements/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteRequestfe = async (id) => {
    try {
      const response = await instance.delete('/Requirements/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateRequestfe = async (formdata) => {
    try {
      const response = await instance.post('/Requirements/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateRequestfe = async (formdata , id) => {
    try {
      const response = await instance.post('/Requirements/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Hrapprove = async ( id) => {
    try {
      const response = await instance.post('/Requirements/'+id+'/hrapprove');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Hrreject = async (  id) => {
    try {
      const response = await instance.post('/Requirements/'+id+'/hrreject');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };