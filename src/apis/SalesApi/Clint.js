import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1/', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});


  export const showAllClients = async () => {
    try {
      const response = await instance.get('/sales/Clint');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showClient = async (id) => {
    try {
      const response = await instance.get('/sales/Clint/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const deleteClient = async (id) => {
    try {
      const response = await instance.delete('/sales/Clint/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateClient = async (formdata) => {
    try {
      const response = await instance.post('/sales/Clint/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const updateClient = async (id,formdata) => {
    try {
      const response = await instance.post('/sales/Clint/'+id+'/update',formdata);
      console.log(response);
      console.log("-".repeat(55))
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  
  export const AnalyticsList = async () => {
    try {
      const response = await instance.get('/sales/Communications/indexsum');
      return response.data;
    }
    catch (error) {
      throw new Error('data failed');
    }
  } 