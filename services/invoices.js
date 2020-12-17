import axios from 'axios';

export const service = {
  fetchAllInvoices: async (params) => axios.get('/invoices/', { params }),
  verifyInvoice: async (invoiceId) => axios.post(`/invoices/${invoiceId}/verify`),
};
