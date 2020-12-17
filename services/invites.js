import axios from 'axios';

export const service = {
  inviteTenant: async (body) => axios.post('/invites/', body),
  acceptInvite: async (invitationId) => axios.post(`/invites/${invitationId}`),
  rejectInvite: async (invitationId) => axios.delete(`/invites/${invitationId}`),
};
