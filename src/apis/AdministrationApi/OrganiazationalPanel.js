import axios from 'axios';
const token = localStorage.getItem('staron_token');
const instance = axios.create({
    baseURL: 'https://erpsystem.darakoutlet.com/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`,
    }, withCredentials: true,
    // Replace with your Laravel backend URL
});


const instanceUpdate = axios.create({
    baseURL: 'https://erpsystem.darakoutlet.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    }, withCredentials: true,
    // Replace with your Laravel backend URL
});

// All Rents Function
export const ShowAllFees = async () => {
    try {
        const response = await instance.get('/adminstration/fees');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Add A New Rent
export const AddNewFee = async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/fees',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Update Existing Rent
export const UpdateFee = async (id,formData) => {
    try {
        console.log(formData);
        const response = await instanceUpdate.put(`/adminstration/fees/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


// Show Specific Rent
export const ShowFee = async (id) => {
    try {
        const response = await instance.get(`/adminstration/fees/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


// Change Rent Status
export const ChangeFeeStatus = async (id) => {
    try {
        const response = await instance.delete(`/adminstration/fees/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


// Rents Functions 
export const ShowAllRents = async () => {
    try {
        const response = await instance.get('/adminstration/rents');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Add A New Rent
export const AddNewRent = async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/rents',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Update Existing Rent
export const UpdateRent = async (id,formData) => {
    try {
        console.log(formData);
        const response = await instanceUpdate.put(`/adminstration/rents/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Change Rent Status
export const ChangeRentStatus = async (id) => {
    try {
        const response = await instance.delete(`/adminstration/rents/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show Specific Rent
export const ShowRent = async (id) => {
    try {
        const response = await instance.get(`/adminstration/rents/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Unplanned Functions
export const ShowAllUnplanned = async () => {
    try {
        const response = await instance.get('/adminstration/unplanedfees');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowUnplanned = async (id) => {
    try {
        const response = await instance.get(`/adminstration/unplanedfees/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Add A New Rent
export const AddNewUnplanned = async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/unplanedfees',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Update Existing Rent
export const UpdateUnplanned = async (id,formData) => {
    try {
        console.log(formData);
        const response = await instanceUpdate.put(`/adminstration/unplanedfees/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Change Rent Status
export const ChangeUnplannedStatus = async (id) => {
    try {
        const response = await instance.delete(`/adminstration/unplanedfees/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};
