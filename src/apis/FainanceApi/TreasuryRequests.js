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


const instanceApp= axios.create({
    baseURL: 'https://erpsystem.darakoutlet.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    }, withCredentials: true,
    // Replace with your Laravel backend URL
});

// Treasury Functions
// Show All Requests for Treasury
export const ShowAllRequests = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const ShowAllDepositRequests = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/depit');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show Specific Request 
export const ShowRequest = async (id) => {
    try {
        const response = await instance.get(`/finance/TresuryAccount${id}`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show All Collection
export const ShowAllCollection = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/collection');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


// Show AR Collection
export const ShowAPCollection = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/ApRequest');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show AR Collection
export const ShowARCollection = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/ARcollection');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


// Show Bank Checks Collection
export const ShowBankChecks = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/BankChecks');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show CashFlow History 
export const ShowCashFlowHistory = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/CashflowHistory');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

// Show Treasury Requests  
export const ShowTreasuryRequests = async () => {
    try {
        const response = await instance.get('/finance/TresuryAccount/TresuryRequests');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};