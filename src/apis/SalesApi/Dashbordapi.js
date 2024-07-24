import axios from 'axios';
const token=  localStorage.getItem('staron_token');
const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
   
  }, withCredentials: true,
  // Replace with your Laravel backend URL
});
export const TotalClint = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/NewStakeholders',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const NumberOfQuntract = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/NumberOfQutation',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ValueOfQuntract = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/ValueOfQutation',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const NumberOfProjects = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/NumberOfProjects',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const ValueOfProjects = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/ValueOfProjects',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const CallCount = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/callcount',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const MeetingCount = async (formdata) => {
    try {
      const response = await instance.post('/sales/dashboard/meetingcount',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const StakeholdersReprsintingApi = async (formdata) => {
    try {
      const response = await instance.get('/sales/dashboard/StakeholdersReprsinting',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };