import axios from 'axios';

const token = localStorage.getItem('staron_token');
const instanceUpload = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  },
  withCredentials: true,
});

const instance = axios.create({
  baseURL: 'http://api.staronegypt.com.eg/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  withCredentials: true,
});

export const ShowAllLeadCrm = async () => {
  try {
    const response = await instance.get('/sales/Crm');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const ShowAllLeads = async () => {
  try {
    const response = await instance.get('/sales/Crm');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const showLead = async (id) => {
  try {
    const response = await instance.get('/sales/Crm/' + id);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const CreateLead = async (formdata) => {
  try {
    const response = await instance.post('/sales/Crm/create', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const UpdateLead = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/update', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const DeleteLead = async (id, formdata) => {
  try {
    console.log(formdata);
    console.log(id);
    const response = await instance.delete('/sales/Crm/' + id, { data: formdata });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};


export const RequestQuantitySurvay = async (id, formdata) => {
  try {
    console.log(id, FormData)
    const response = await instanceUpload.post('/sales/Crm/' + id + '/RFQ', formdata);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// Funnel Workflow Ends here

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

export const CreateQUT = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/RFQ', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const SendOfferdata = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/SendOffer', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const AcceptOffer = async (id) => {
  try {
    const response = await instance.get('/sales/Crm/' + id + '/acceptOffer');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const RejectOffer = async (id) => {
  try {
    const response = await instance.get('/sales/Crm/' + id + '/rejectOffer');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const StartQutation = async (id) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/startQutation');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const SendQUT = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/sendQutation', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

export const SendContractdata = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/sendcontract', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};


// latest functions 
// switch to another 
export const switchQSAssign = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/switch', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// {
//   "asignby":188
// }

// quotation approve in status: (pending quotation approve)
export const quotationApprove = async (id) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/QutationApprove');
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// quotation reject in status: (pending quotation approve)
export const quotationReject = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/QutationReject', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// {
//   "reason":"dslvnsjdvnskjd"
// }


// client Approve in status : (pending client approve)
export const clientApprove = async (id, formdata) => {
  try {
    const response = await instanceUpload.post('/sales/Crm/' + id + '/clintApprove', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// {
//   "contractdata" : null, 
//   "contractValue": 9634
// }

// client Reject in status : (pending client approve)
export const clientReject = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/clintReject', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// {
//   "reason":"dslvnsjdvnskjd"
// }

// client Recalculation in status : (pending client approve)
export const clientRecalculation = async (id, formdata) => {
  try {
    const response = await instance.post('/sales/Crm/' + id + '/clintRecalculation', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// {
//   "reason":"dslvnsjdvnskjd"
// }


// submit drafting in status : (pending quotation drafting)
export const submitDrafting = async (id, formdata) => {
  try {
    const response = await instanceUpload.post('/sales/Crm/' + id + '/submitdrafting', formdata);
    return response.data;
  } catch (error) {
    throw new Error('data failed');
  }
};

// {
//   "file" : null
// }