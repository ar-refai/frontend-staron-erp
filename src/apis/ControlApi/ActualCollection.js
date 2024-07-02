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
export const ShowAllReport = async () => {
  try {
    const response = await instance.get('/finance/ActualCollection');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};
export const showReport = async (id) => {
  try {
    const response = await instance.get('/finance/ActualCollection/'+id);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};
