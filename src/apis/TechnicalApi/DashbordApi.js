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

  export const TotalNumberOfQCApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/totalnumberofqc',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const TotalNumberOfPackageApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/totalnumberofpackage',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Top5QCApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/top5qc',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Top5PackageApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/top5package',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Bottom5QCApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/bottom5qc',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const Bttom5PackageApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/bottom5package',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const AverageQuantityApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/averagequantity',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
  export const AveragePackageApi= async (formdata) => {
    try {
      const response = await instance.post('/technical/dashboard/averagepackage',formdata);
      return response.data;
    } catch (error) {
      throw new Error('data failed');
    }
  };
