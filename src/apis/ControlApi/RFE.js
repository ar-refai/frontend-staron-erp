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
export const ShowAllRequestfe = async () => {
    try {
      const response = await instance.get('/Requestfe');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showRequestfe = async (id) => {
    try {
      const response = await instance.get('/Requestfe/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteRequestfe = async (id,formData) => {
    try {
      const response = await instance.delete('/Requestfe/'+id,formData);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateRequestfe = async (formdata) => {
    try {
      const response = await instance.post('/Requestfe/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateRequestfe = async (formdata , id) => {
    try {
      const response = await instance.post('/Requestfe/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Hrapprove = async ( id) => {
    try {
      const response = await instance.post('/Requestfe/'+id+'/hrapprove');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Hrreject = async (  id) => {
    try {
      const response = await instance.post('/Requestfe/'+id+'/hrreject');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };