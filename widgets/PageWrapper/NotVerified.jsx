import Button from 'components/Button'


const NotVerified = () => {
    return (
        <>
            <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
            <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
            <div className="container not-verified-container">
                <h3 className="main-title">Account Not Verified</h3>
                <div className="row mt-5">
                    Account email has not been verified, please check your email for a verification.
                    If you have not received any verification email or verification link has expired,
                    please click on the "Resend Verification Email" button.
                </div>
                <Button className='mt-5'>Resend Verification Email</Button>
            </div>
        </>
    )
}

export default NotVerified