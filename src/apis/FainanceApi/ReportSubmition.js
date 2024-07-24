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
export const ShowAllReport = async () => {
    try {
      const response = await instance.get('/finance/ReportSubmition');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showReport = async (id) => {
    try {
      const response = await instance.get('/finance/ReportSubmition/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteReport = async (id) => {
    try {
      const response = await instance.delete('/finance/ReportSubmition/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateReport = async (formdata) => {
    try {
      const response = await instance.post('/finance/ReportSubmition/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdateReports = async (formdata , id) => {
    try {
      const response = await instance.post('/finance/ReportSubmition/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };