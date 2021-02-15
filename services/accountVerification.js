import axios from 'axios';


export const resendVerificationEmail = async () => axios.post('/users/verify/resend')
export const verifyEmailAddress = async (verificationToken) => axios.post(`/users/verify/${verificationToken}`)
