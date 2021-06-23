/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useMe } from 'hooks/useMe';
import AccountLandlord from 'pages/account/AccountLandlord';
import AccountTenant from 'pages/account/AccountTenant';
import { useCallback } from 'react';
import { role } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper/index';

const Page = () => {
  // CUSTOM HOOKS
  const { me } = useMe();
  // METHODS
  const getData = useCallback(() => {
    switch (me?.role) {
      case role.TENANT: {
        return {
          title: 'TENANT',
          pageName: 'account',
          component: <AccountTenant />,
        };
      }

      case role.LANDLORD: {
        return {
          title: 'LANDLORD',
          pageName: 'account',
          component: <AccountLandlord />,
        };
      }
    }
  }, [me]);

  return me ? (
    <PageWrapper title="DigiRent - Account" pageName={getData().pageName} verificationRequired={true}>
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
      <div className="container">
        <h3 className="main-title">EDIT PROFILE</h3>
        <p className="main-subtitle text-primary">{getData().title}</p>

        {getData().component}
      </div>
    </PageWrapper>
  ) : null;
};

export default Page;
