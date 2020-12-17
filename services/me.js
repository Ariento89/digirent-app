import axios from 'axios';

export const service = {
  me: async () => axios.get('/me/'),
  updateProfileInformation: async (body) => axios.put('/me/', body),

  setTenantLookingFor: async (body) => axios.post('/me/looking-for/', body),
  setUserBankDetails: async (body) => axios.post('/me/bank/', body),

  updatePassword: async (body) => axios.put('/me/password/', body),

  uploadCopyId: async (body) => axios.post('/me/upload/copy-id/', body),
  uploadProofOfIncome: async (body) => axios.post('/me/upload/proof-of-income/', body),
  uploadProofOfEnrollment: async (body) => axios.post('/me/upload/proof-of-enrollment/', body),
  uploadProfilePhoto: async (body) => axios.post('/me/upload/profile-image/', body),

  fetchMyApartmentApplications: async () => axios.get('/me/applciations'), // TODO: Tell Shai to fix spelling
};
