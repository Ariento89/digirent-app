import axios from 'axios';
import { HEADER_MULTIPART_FORM_DATA, NO_VERIFICATION_CONFIG } from './index';


export const resendVerificationEmail = async () => axios.post('/users/verify/resend')
export const verifyEmailAddress = async (verificationToken) => axios.post(`/users/verify/${verificationToken}`)
