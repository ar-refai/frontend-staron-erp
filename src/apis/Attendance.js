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
export const ShowAllAttendance = async () => {
    try {
      const response = await instance.get('/attendance');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteAttendance = async (id) => {
    try {
      const response = await instance.delete('/attendance/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAttendance = async (id) => {
    try {
      const response = await instance.get('/attendance/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const addetionEmployee = async (id,formdata) => {
    try {
      const response = await instance.post('/attendance/'+id+"/addetion",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const deductionEmployee = async (id,formdata) => {
    try {
      const response = await instance.post('/attendance/'+id+"/deduction",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateUserAttendance = async (id,formdata) => {
    try {
      const response = await instance.post('/attendance/'+id+"/update",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateAttendanceExel = async (formdata) => {
    try {
      const response = await instance.post('/attendance/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateAttendance = async (formdata) => {
    try {
      // console.log(formdata);

      const response = await instance.post('/attendance/createmanual',formdata);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };