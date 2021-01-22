import Button from 'components/Button'
import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import * as verificationService from 'services/accountVerification'
import {toastTypes} from 'shared/types'


const NotVerified = () => {
    const [loading, setLoading] = useState(false)
    const {addToast} = useToasts()

    const onResend  = async () => {
        setLoading(true)
        try{
            await verificationService.resendVerificationEmail();
            addToast('Email sent. Check and verif your account', toastTypes.SUCCESS);
        }
        catch(err){
            addToast(err.response.data.detail, toastTypes.ERROR);
        }
        setLoading(false)
    }
    return (
        <>
            <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
            <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
            <div className="container not-verified-container">
                <h3 className="main-title">Account Not Verified</h3>
                <div className="row mt-5">
                    Account email has not been verified, please check your email for a verification URL.
                    If you have not received any verification email or verification link has expired,
                    please click on the "Resend Verification Email" button.
                </div>
                <Button className='mt-5' loading={loading} onClick={onResend}>Resend Verification Email</Button>
            </div>
        </>
    )
}

export default NotVerified