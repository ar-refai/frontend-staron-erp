import axios from 'axios';
const token=  localStorage.getItem('api_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1/SupplyChain', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const ShowAllEmployee = async () => {
    try {
      const response = await instance.get('/procurment');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const showEmployee = async (id) => {
    try {
      const response = await instance.get('/procurment/'+id);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const StartEmployee = async (id) => {
    try {
      const response = await instance.post('/procurment/'+id+"/start");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CompleteEmployee = async (id) => {
    try {
      const response = await instance.post('/procurment/'+id+"/complete");
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const RequestForMoney = async (id,formdata) => {
    try {
      const response = await instance.post('/procurment/'+id+'/RequestForMoney',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };

  export const CompletedProcurementsData = async (Data) => {
    try {
      const response = await instance.post('/control/Scplan/CompletedProcurements',Data);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const LastRecordData = async () => {
    try {
      const response = await instance.get('/control/Scplan/lastdata');
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const RejectedProcurementsData = async (Data) => {
    try {
      const response = await instance.post('/control/Scplan/RejectedProcurements',Data);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CostsCollectedData = async (Data) => {
    try {
      const response = await instance.post('/control/Scplan/CostsCollected',Data);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const TotalCostsData = async (Data) => {
    try {
      const response = await instance.post('/control/Scplan/TotalCosts',Data);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ProcurmentPriortyApi = async (Data) => {
    try {
      const response = await instance.post('/control/Scplan/priortyrate',Data);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };