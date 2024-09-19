import axios from 'axios';
const token = localStorage.getItem('staron_token');
const instance = axios.create({
    baseURL: 'https://erpsystem.darakoutlet.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    }, withCredentials: true,
    // Replace with your Laravel backend URL
});

export const ShowAllRequests = async () => {
    try {
        const response = await instance.get('/user/Requestfe');
        return response.data;
    } catch (error) {
        throw new Error('Fetching requests data failed!');
    }
};

export const ApproveRequest = async (id) => {
    try {
        const response = await instance.post(`/humanresource/Requestfe/${id}/hrapprove`);
        return response.data;
    } catch (error) {
        throw new Error('Fetching requests data failed!');
    }
};

export const RejectRequest = async (id) => {
    try {
        const response = await instance.post(`/humanresource/Requestfe/${id}/hrreject`);
        return response.data;
    } catch (error) {
        throw new Error('Fetching requests data failed!');
    }
};