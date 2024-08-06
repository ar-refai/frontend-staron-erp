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
export const ShowAllQSTarget= async () => {
    try {
      const response = await instance.get('/technical/Target/QStarget');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllPackageTarget= async () => {
    try {
      const response = await instance.get('/technical/Target/packagetarget');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
