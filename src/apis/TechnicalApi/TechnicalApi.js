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
export const ShowAllEmployee = async () => {
    try {
      const response = await instance.get('/technical/requests');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAlloperationrequest = async () => {
    try {
      const response = await instance.get('/technical/requests/operation-request');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showEmployee = async (id) => {
    try {
      const response = await instance.get('/technical/requests/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const StartTask = async (id) => {
    try {
      const response = await instance.get('/technical/requests/'+id+"/starttask");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const RejectTask = async (formData,id) => {
    try {
      const response = await instance.post('/technical/requests/'+id+"/RejectTask",formData);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const StartPackage = async (id) => {
    try {
      const response = await instance.get('/technical/requests/'+id+"/startPackage");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const RejectPackage = async (formData,id) => {
    try {
      const response = await instance.post('/technical/requests/'+id+"/RejectPackage",formData);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendQC = async (id,formdata) => {
    try {
      const response = await instance.post('/technical/requests/'+id+"/SendQC",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendAsBuild = async (id,formdata) => {
    try {
      const response = await instance.post('/technical/requests/'+id+"/SendQC",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const SendPackedgedata = async (id,formdata) => {
    try {
      const response = await instance.post('/technical/requests/'+id+"/SendPackage",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteEmployee = async (id) => {
    try {
      const response = await instance.delete('/technical/requests/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateEmployee = async (formdata) => {
    try {
      const response = await instance.post('/technical/requests/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateEmployees = async (formdata , id) => {
    try {
      const response = await instance.post('/technical/requests/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };