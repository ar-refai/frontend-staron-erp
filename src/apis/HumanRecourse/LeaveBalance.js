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

export const showAllRequests = async () => {
    try {
        const response = await instance.get('/humanresource/leavingbalance');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const increaseRequest = async (formData) => {
    try {
        const response = await instance.post('/humanresource/leavingbalance/store',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const showEmployeeHistoryLog  =  async (id) =>{
    try {
        const response = await instance.get(`/humanresource/leavingbalance/${id}/user`);
        return response.data;
    }
    catch(err) {
        throw new Error('data failed');
    }
}

export const decreaseRequest = async (formData) => {
    try {
        const response = await instance.post('/humanresource/leavingbalance/store',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};