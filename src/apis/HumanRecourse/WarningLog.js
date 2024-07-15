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

export const getAllWarningLogs = async () => {
    try {
        const response = await instance.get('/humanresource/warninglog');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const getAllEmployeeWarningLog = async (id) => {
    try {
        const response = await instance.get(`/humanresource/warninglog/${id}/user`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const getWarningRequest = async (id) => {
    try {
        const response = await instance.get(`/humanresource/warninglog/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const storeWarning = async (data) => {
    try {
        const response = await instance.post(`/humanresource/warninglog/store`,data);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// sent data
// {
//     "userid": 1,
//     "level": 3,
//     "date": "2024-07-05",
//     "text": "This is a warning log entry."
// }
