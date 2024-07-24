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
      const response = await instance.get('/user/Attendance');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
