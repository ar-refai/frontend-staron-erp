import axios from 'axios';
const token = localStorage.getItem('staron_token');
const instance = axios.create({
    baseURL: 'http://api.staronegypt.com.eg/api/v1',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,

    }, withCredentials: true,
    // Replace with your Laravel backend URL
});

export const ShowAllRequests = async () => {
    try {
        const response = await instance.get('/technical/requests');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};
export const showDeptEmployees = async () => {
    try {
        const response = await instance.get('/humanresource/employee/department');
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const assignEmployee = async (id , formData) => {
    try {
        const response = await instance.post(`/technical/requests/${id}/assign`,formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};


export const startQS = async (id) => {
    try {
        const response = await instance.post(`/technical/requests/${id}/starttask`);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};

export const sendQS = async (id, formData) => {
    try {
        const response = await instance.post(`/technical/requests/${id}/SendQC`, formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};
// formData sample: 
// {
//     "qcdata": null,
//     "qc": [
//         {
//             "name": "Quality Control Item 1",
//             "totalcost": 150.75,
//             "applecation": [
//                 {
//                     "stockid": "STK123",
//                     "price": 50.25,
//                     "quantity": 3,
//                     "description": "Description for item 1"
//                 },
//                 {
//                     "stockid": "STK124",
//                     "price": 25.50,
//                     "quantity": 2,
//                     "description": "Description for item 2"
//                 }
//             ]
//         },
//         {
//             "name": "Quality Control Item 2",
//             "totalcost": 200.00,
//             "applecation": [
//                 {
//                     "stockid": "STK125",
//                     "price": 100.00,
//                     "quantity": 1,
//                     "description": "Description for item 3"
//                 },
//                 {
//                     "stockid": "STK126",
//                     "price": 50.00,
//                     "quantity": 2,
//                     "description": "Description for item 4"
//                 }
//             ]
//         }
//     ]
// }


export const rejectQS = async (id, formData) => {
    try {
        const response = await instance.post(`/technical/requests/${id}/RejectTask`, formData);
        return response.data;
    } catch (error) {
        throw new Error('data failed');
    }
};
// formData sample:
// {
//     "qcstatus":"Request for Information",//out of scope,Request for Information
//     "reason":"the data not applecaple"
// }

