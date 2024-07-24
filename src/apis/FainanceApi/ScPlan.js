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
      const response = await instance.get('/control/Scplan');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const RequestForNoMoney = async (id) => {
    try {
      const response = await instance.post('/control/Scplan/'+id+'/AcceptRequestForNoMoney');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const RequestForMoney = async (id) => {
    try {
      const response = await instance.post('/control/Scplan/'+id+'/AcceptRequestForMoney');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
