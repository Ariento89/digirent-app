/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import LoadingPage from 'components/LoadingPage/index';
import { useMe } from 'hooks/useMe';
import * as verificationService from 'services/accountVerification'
import AccountLandlord from 'pages/account/AccountLandlord';
import AccountTenant from 'pages/account/AccountTenant';
import { useCallback, useEffect } from 'react';
import { role, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper/index';
import { useRouter } from 'node_modules/next/dist/client/router';
import { useToasts } from 'react-toast-notifications';

const Page = ({query}) => {
    // CUSTOM HOOKS
    const { me, getMe } = useMe();
    const router = useRouter();
    const {addToast} = useToasts();


    const verifyAccount = async () => {
        try{
            console.log(router.query.token)
            await verificationService.verifyEmailAddress(query.token);
            getMe(null, {
                onSuccess: () => {router.replace('/account')}, 
                onError: () => {router.replace('/')}
            })
        }
        catch(err){
            // addToast(err.response.data.detail, toastTypes.ERROR)
            router.replace('/')
        }
    }

    useEffect(() => {verifyAccount()}, [])

    return (<LoadingPage/>)

//   return (
//     <PageWrapper title="DigiRent - Verify Account" pageName="Verif Account" verificationRequired={false}>
//       <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
//       <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
//       <div className="container not-verified-container">
//         <h3 className="main-title">Verify Account</h3>
//         <p className="main-subtitle text-primary">Account Verification</p>
//         Please wait while we verify your account......
//       </div>
//     </PageWrapper>
//   );
};


export async function getServerSideProps({query}) {
  return {
      props: {
          query: query
      }
  }
}

export default Page;
