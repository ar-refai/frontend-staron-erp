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
      const response = await instance.get('/humanresource/employee');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showEmployee = async (id) => {
    try {
      const response = await instance.get('/humanresource/employee/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const IncressEmployee = async (id) => {
    try {
      const response = await instance.post('/users/'+id+"/incress");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const GetWarningEmployee = async (id) => {
    try {
      const response = await instance.get("/users/getUsersWithWarningCounts");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const IncressEmployeeWarning = async (id) => {
    try {
      const response = await instance.get('/users/'+id+"/addWarning");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DecressEmployee = async (id) => {
    try {
      const response = await instance.post('/users/'+id+"/decress");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteEmployee = async (id,formData) => {
    try {
      const response = await instance.delete('/users/'+id,formData);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateEmployee = async (formdata) => {
    try {
      const response = await instance.post('/humanresource/employee/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateEmployees = async (formdata , id) => {
    console.log("*".repeat(24))
    console.log(formdata);
    console.log("*".repeat(24))


    try {
      const response = await instance.post('/humanresource/employee/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };