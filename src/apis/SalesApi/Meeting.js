import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1/sales', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});

  export const ShowAllMeetinglog = async () => {
    try {
      const response = await instance.get('/Communications');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  
  export const ShowAllanalysis = async () => {
    try {
      const response = await instance.get('/Communications/indexsum');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showMeetinglog = async (id) => {
    try {
      const response = await instance.get('/Communications/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteMeetinglog = async (id) => {
    try {
      const response = await instance.delete('/Communications/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const CreateMeetinglog = async (formdata) => {
    try {
      const response = await instance.post('/Communications/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  
  export const UpdatMeetinglog = async (id,formdata) => {
    try {
      const response = await instance.post('/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };