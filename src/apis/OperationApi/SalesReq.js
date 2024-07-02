import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'https://erpsystem.darakoutlet.com/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});

  export const ShowAlloperationrequest = async () => {
    try {
      const response = await instance.get('/technical/requests/operation-request');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const StartTask = async (id) => {
    try {
      const response = await instance.get('/technical/requests/'+id+"/Asbuilttrack");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendOperation = async (id,formdata) => {
    try {
      const response = await instance.post('/technical/requests/'+id+'/Asbuiltcomplete',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };