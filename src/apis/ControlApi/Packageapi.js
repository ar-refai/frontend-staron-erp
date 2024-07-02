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
export const ShowAllPackage = async () => {
    try {
      const response = await instance.get('/control/requests');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const StartTask = async (id) => {
    try {
      const response = await instance.get('/control/requests/'+id+"/starttask");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendPackedgedata = async (id,formdata) => {
    try {
      const response = await instance.post('/control/requests/'+id+"/complete",formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
