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
export const ShowAllLeadCrm = async () => {
    try {
      const response = await instance.get('/sales/Crm/pendinglead');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllCompletedProject = async () => {
    try {
      const response = await instance.get('/sales/Crm/completed');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllRejectedProject = async () => {
    try {
      const response = await instance.get('/sales/Crm/rejected');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllQsCrm = async () => {
    try {
      const response = await instance.get('/sales/Crm/qsstatus');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ShowAllDraftCrm = async () => {
    try {
      const response = await instance.get('/sales/Crm/qutationStatus');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showCrm = async (id) => {
    try {
      const response = await instance.get('/sales/Crm/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const DeleteCrm = async (id) => {
    try {
      const response = await instance.delete('/sales/Crm/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateCrm = async (formdata) => {
    try {
      const response = await instance.post('/sales/Crm/create',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CreateQUT = async (id,formdata) => {
    try {
      const response = await instance.post('/sales/Crm/'+id+'/RFQ',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendOfferdata = async (id,formdata) => {
    try {
      const response = await instance.post('/sales/Crm/'+id+'/SendOffer',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const AcceptOffer = async (id) => {
    try {
      const response = await instance.get('/sales/Crm/'+id+'/acceptOffer');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const RejectOffer = async (id) => {
    try {
      const response = await instance.get('/sales/Crm/'+id+'/rejectOffer');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const UpdatCrm = async (id,formdata) => {
    try {
      const response = await instance.post('/sales/Crm/'+id+'/update',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const StartQutation = async (id) => {
    try {
      const response = await instance.post('/sales/Crm/'+id+'/startQutation');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendQUT = async (id,formdata) => {
    try {
      const response = await instance.post('/sales/Crm/'+id+'/sendQutation',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const SendContractdata = async (id,formdata) => {
    try {
      const response = await instance.post('/sales/Crm/'+id+'/sendcontract',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };