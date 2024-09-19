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

export const ShowSpecificRequest = async (id) => {
    try {
        const response = await instance.get(`/user/Requestfe/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Fetching requests data failed!');
    }
};

export const CreateNewRequest = async (formData) => {
    try {
        const response = await instance.post('/user/Requestfe', formData);
        return response.data;
    } catch (error) {
        throw new Error('Creating request failed!');
    }
}

export const UpdateRequest = async (id,formData) => {
    try {
        const response = await instance.put(`/user/Requestfe/${id}` , formData);
        return response.data;
    } catch (error) {
        throw new Error('Updating request failed!');
    }
}

export const DeleteRequest = async (id) => {
    try {
        const response = await instance.delete(`/user/Requestfe/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Deletings request failed!');
    }
}



