import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1/user/Requirements', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});

  export const ShowAllApprovedRequrment = async () => {
    try {
      const response = await instance.get('/aproved');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllPendingRequrment = async () => {
    try {
      const response = await instance.get('/pending');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllRejectedRequrment = async () => {
    try {
      const response = await instance.get('/rejected');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showRequrment = async (id) => {
    try {
      const response = await instance.get('/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const DeleteRequrment = async (id) => {
    try {
      const response = await instance.delete('/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateRequrment = async (formdata) => {
    try {
      const response = await instance.post('/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateRequrmentApi = async (formdata , id) => {
    try {
      const response = await instance.post('/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
