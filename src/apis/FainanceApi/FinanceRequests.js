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


const instanceUpdate = axios.create({
  baseURL: 'https://erpsystem.darakoutlet.com/api/v1', 
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`,
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});

// Chart of Accounts Functions
export const ShowAllAccounts = async () => {
  try {
    const response = await instance.get('/finance/chartAccount/all');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const AllAccountsFlatted = async () => {
  try {
    const response = await instance.get('/finance/chartAccount/all');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const ShowAllChildrenAccounts = async () => {
  try {
    const response = await instanceUpdate.get('/finance/chartAccount/child');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};


export const AddAccount = async (formData) => {
  try {
    console.log(formData);
    const response = await instance.post('/finance/chartAccount', formData);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const AccountsList = async (formData) => {
  try {
    const response = await instance.get('/finance/chartAccount/all', formData);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};


export const showAccount = async (id) => {
  try {
    const response = await instance.get(`/finance/chartAccount/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const UpdateAccount = async (id , formData) => {
  try {
    console.log(id);
    console.log('***************');
    console.log(formData);
    const response = await instanceUpdate.put(`/finance/chartAccount/${id}`, JSON.stringify(formData,0,2));
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// Main Journal Functions 
export const MainJournalAccounts = async () => {
  try {
    const response = await instance.get('/finance/mainjournal');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const AddMainJournalRecord = async (formData) => {
  try {
    console.log(formData);
    const response = await instance.post('/finance/mainjournal', formData);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const UpdateMainJournalRecord = async (id, formData) => {
  try {
    console.log(formData);
    const response = await instanceUpdate.put(`/finance/mainjournal/${id}`,formData);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};
export const ShowTBRecords = async (formData) => {
  try {
    console.log(formData);
    const response = await instanceUpdate.post('/finance/mainjournal/trail',formData);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};
export const getSingleMainJournalRecord = async (id) => {
  try {
    const response = await instance.get(`/finance/mainjournal/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// General Ledger Functions 

export const ShowGLRecords = async (formData) => {
  try {
    // console.log("########")
    // console.log(formData);
    // console.log("########")
    const response = await instanceUpdate.post(`/finance/mainjournal/lager`,formData);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};


// Finance Validation Functions for Chart Of Accounts and Main Journal
// COA All Requests
export const showAllValidationRequests = async () =>{

  try {

    const response = await instance.get('/finance/chartAccountValidation/pending');
    return response.data;

  } catch (error) {

    throw new Error('data faild');
  }
} 

// Show single Validation Request
export const showValidationRequest = async (id) => {

  try{

    const response = await instance.get(`/finance/chartAccountValidation/show/${id}`);
    return response.data;

  } catch (error) {
    throw new Error('data faild');
  }

}

// store new request
export const storeValidationRequest = async (formData) =>{

  try {
    const response = await instanceUpdate.post('/finance/chartAccountValidation/store', formData);
    return response.data;
  } catch (error) {
    throw new Error('data faild');
  }
}

// approve an existing request 
export const approveValidationRequest = async (id) => {
  try {
    
    const response = await instanceUpdate.post(`/finance/chartAccountValidation/approve/${id}`);
    return response.data;
    
  } catch (error) {
    throw new Error('data faild');
  }
}

// show a user 
export const FetchUserById = async (id) => {
  try {
    const response = await instance.get('/humanresource/employee/'+id);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};