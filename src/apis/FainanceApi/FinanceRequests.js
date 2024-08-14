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
    const response = await instance.get('/finance/chartAccount');
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

export const getSingleMainJournalRecord = async (id) => {
  try {
    const response = await instance.get(`/finance/mainjournal/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// General Ledger Functions 

export const ShowGLRecords = async (id) => {
  try {
    const response = await instance.get(`/finance/mainjournal/lager/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};


// Trial Balance Functions

export const ShowTBRecords = async (formData) => {
  try {
    // console.log(formData);
    const response = await instance.get(`/finance/mainjournal/trail}`,formData);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};
