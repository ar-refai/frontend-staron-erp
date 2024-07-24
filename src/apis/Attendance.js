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
export const ShowAllAttendance = async () => {
    try {
      const response = await instance.get('/humanresource/attendance');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteAttendance = async (id) => {
    try {
      const response = await instance.delete('/humanresource/attendance/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAttendance = async (id) => {
    try {
      const response = await instance.get('/humanresource/attendance/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const addetionEmployee = async (id,formdata) => {
    try {
      const response = await instance.post('/humanresource/attendance/'+id+"/addetion",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const deductionEmployee = async (id,formdata) => {
    try {
      console.log("form data" ,formdata);
      const response = await instance.post('/humanresource/attendance/'+id+"/deduction",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateUserAttendance = async (id,formdata) => {
    try {
      console.log("form data" ,formdata);

      const response = await instance.post('/humanresource/attendance/'+id+"/update",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateAttendanceExel = async (formdata) => {
    try {
      const response = await instance.post('/humanresource/attendance/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateAttendance = async (formdata) => {
    try {
      // console.log(formdata);

      const response = await instance.post('/humanresource/attendance/createmanual',formdata);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };