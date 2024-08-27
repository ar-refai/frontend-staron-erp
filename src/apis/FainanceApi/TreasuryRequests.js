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

// from Pending to In Progress 
export const ToInProgress = async (id,formData) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/transfareprogress`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const BankApprove = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/bankapprove`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const AccountsRepresentativeApprove = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/AccountsrepresentativeApprove`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const CancelTransfere = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/cancelled`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const AccountApprove = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/AccountApprove`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const TreasuryApprove = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/tresuryApprove`);
        return response.data;
    } catch (error) {
        console.log("There was an error: ",error);
    }
}
//  check collection 

export const ChecksCollection = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/check/collect`);
        return response.data;
    }
    catch (error) {
        console.log('There was an error: ' ,error);
    }
}

export const RejectChecksCollection = async (id) => {
    try {
        const response = await instance.post(`/finance/TresuryAccount/${id}/check/reject`);
        return response.data;
    }
    catch (error) {
        console.log('There was an error: ' ,error);
    }
}

// Bank Accounts Requests

// Show All Bank Accounts
export const ShowAllBanks = async () => {
    try {
        const response = await instance.get(`/finance/banks`);
        return response.data;
    }
    catch (error) {
        console.log('There was an error: ' ,error);
    }
}

// Add Banks
export const AddBankAccount = async (formData) => {
    try {
        const response = await instance.post(`/finance/banks`, formData);
        return response.data;
    }
    catch (error) {
        console.log('There was an error: ' ,error);
    }
}


// Update Bank Account
export const UpdateBankAccount = async (id,formData) => {
    try {
        const response = await instanceApp.put(`/finance/banks/${id}`, formData);
        return response.data;
    }
    catch (error) {
        console.log('There was an error: ' ,error);
    }
}

// Show the bank account
export const ShowBankProfile = async (id) => {
    try {
        const response = await instance.get(`/finance/banks/${id}`);
        return response.data;
    }
    catch (error) {
        console.log('There was an error: ' ,error);
    }
}