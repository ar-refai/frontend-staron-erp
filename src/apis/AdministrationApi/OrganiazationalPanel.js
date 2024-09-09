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
// All factory functions (facilities)
export const ShowAllFactories = async () => {
    try {
        const response = await instance.get('/adminstration/factory');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
}
// Add more functions (for the facilities)


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
        const response = await instance.get('/adminstration/rent');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Add A New Rent
export const AddNewRent = async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/rent',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Update Existing Rent
export const UpdateRent = async (id,formData) => {
    try {
        console.log(formData);
        const response = await instanceUpdate.put(`/adminstration/rent/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Change Rent Status
export const ChangeRentStatus = async (id) => {
    try {
        const response = await instance.delete(`/adminstration/rent/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show Specific Rent
export const ShowRent = async (id) => {
    try {
        const response = await instance.get(`/adminstration/rent/${id}`);
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


// Supplies Functions
export const AddNewSupplies = async (formData) => {
    try {
        console.log(formData);
        const response = await instanceUpdate.post('/adminstration/supplies',formData);
        console.log(formData);

        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const UpdateSupplies = async (id,formData) => {
    try {
        const response = await instanceUpdate.put(`/adminstration/supplies/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowSupplies = async (id) => {
    try {
        const response = await instanceUpdate.get(`/adminstration/supplies/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowAllSupplies = async () => {
    try {
        const response = await instanceUpdate.get('/adminstration/supplies');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const ChangeSuppliesStatus = async (id) => {
    try {
        const response = await instanceUpdate.delete(`/adminstration/supplies/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

//  Utilities Functions
export const AddNewUtilities = async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/utilites',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const UpdateUtilities = async (id,formData) => {
    try {
        const response = await instanceUpdate.put(`/adminstration/utilites/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowUtilities = async (id) => {
    try {
        const response = await instanceUpdate.get('/adminstration/utilites');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowAllUtilities = async () => {
    try {
        const response = await instanceUpdate.get('/adminstration/utilites');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const ChangeUtilitiesStatus = async (id) => {
    try {
        const response = await instanceUpdate.delete(`/adminstration/utilites/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// 
// Miscellaneous Functions
export const AddNewMiscellaneous= async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/miscelleneous',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const UpdateMiscellaneous= async (id,formData) => {
    try {
        const response = await instanceUpdate.put(`/adminstration/miscelleneous/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowMiscellaneous = async (id) => {
    try {
        const response = await instanceUpdate.get(`/adminstration/miscelleneous/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowAllMiscellaneous = async () => {
    try {
        const response = await instanceUpdate.get('/adminstration/miscelleneous');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const ChangeMiscellaneousStatus = async (id) => {
    try {
        const response = await instanceUpdate.delete(`/adminstration/miscelleneous/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Subscriptions Functions
export const AddNewSubscriptions= async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/Subscliption',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const UpdateSubscriptions= async (id,formData) => {
    try {
        const response = await instanceUpdate.put(`/adminstration/Subscliption/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Subscriptions
export const ShowSubscriptions = async (id) => {
    try {
        const response = await instanceUpdate.get(`/adminstration/Subscliption/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowAllSubscriptions = async () => {
    try {
        const response = await instanceUpdate.get('/adminstration/Subscliption');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const ChangeSubscriptionsStatus = async (id) => {
    try {
        const response = await instanceUpdate.delete(`/adminstration/Subscliption/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Subscriptions Functions
export const AddNewMaintainance= async (formData) => {
    try {
        const response = await instanceUpdate.post('/adminstration/maintainance',formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const UpdateMaintainance= async (id , formData) => {
    try {
        const response = await instanceUpdate.put(`/adminstration/maintainance/${id}`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Maintainance Functions
export const ShowMaintainance = async (id) => {
    try {
        const response = await instanceUpdate.get(`/adminstration/maintainance/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowAllMaintainance = async () => {
    try {
        const response = await instanceUpdate.get('/adminstration/maintainance');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const ChangeMaintainanceStatus = async (id) => {
    try {
        const response = await instanceUpdate.delete(`/adminstration/maintainance/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};