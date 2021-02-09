/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next';
import qs from 'querystring';
import LoadingPage from 'components/LoadingPage/index';
import { useAuthentication } from 'hooks/useAuthentication';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { toastTypes, userTypes } from 'shared/types';
import CookieOverlay from 'widgets/CookieOverlay/index';
import HomeAreasOfExpertise from 'widgets/_PageHome/HomeAreasOfExpertise';
import HomeBlog from 'widgets/_PageHome/HomeBlog';
import HomeExploreOurMostPopularCities from 'widgets/_PageHome/HomeExploreOurMostPopularCities';
import HomeHowDoesItWork from 'widgets/_PageHome/HomeHowDoesItWork';
import HomeLanding from 'widgets/_PageHome/HomeLanding';
import HomeLoginModal from 'widgets/_PageHome/HomeLoginModal';
import HomePageWrapper from 'widgets/_PageHome/HomePageWrapper';
import HomeRecentlyAddedProperties from 'widgets/_PageHome/HomeRecentlyAddedProperties';
import HomeRegisterModal from 'widgets/_PageHome/HomeRegisterModal';
import HomeSectionDivider from 'widgets/_PageHome/HomeSectionDivider';
import HomeWhyChooseDigiRentOverAnyAgency from 'widgets/_PageHome/HomeWhyChooseDigiRentOverAnyAgency';

const Page = ({ query }) => {
  // STATES
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [isCookieAccepted, setIsCookieAccepted] = useLocalStorage('cookies', false);
  const [initialUserType, setInitialUserType] = useState(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const router = useRouter();
  const { loginFacebook, loginGoogle, /* status, */errors } = useAuthentication();
  const { sessionTimedOut, clearSessionTimeOut } = useAuthentication();

  // METHODS
  useEffect(() => {
    if (sessionTimedOut) {
      addToast('Session timed out. Please login again.', toastTypes.WARNING);
      clearSessionTimeOut();
    }
  }, [sessionTimedOut]);

  useEffect(() => {
    const queryString = qs.stringify(query);
    if (queryString.includes('google')) {
      loginGoogle(
        { query },
        {
          onSuccess: () => {
            addToast('Login successful', toastTypes.SUCCESS);
            router.push('/');
          },
          onError: () => router.push('/'),
        },
      );
    } else if (queryString && queryString.includes('code') && queryString.includes('state')) {
      loginFacebook(
        { query },
        {
          onSuccess: () => {
            addToast('Login successful', toastTypes.SUCCESS);
            router.push('/');
          },
          onError: () => router.push('/'),
        },
      );
    }
  }, [query]);

  useEffect(() => {
    if (errors?.length) {
      addToast(errors[errors.length - 1], toastTypes.ERROR);
    }
  }, [errors]);

  const onSelectRegister = (userType) => {
    setInitialUserType(userType);
    setRegisterModalVisible(true);
  };

  if (query.state) {
    return <LoadingPage />;
  }

  return (
    <HomePageWrapper
      title="DigiRent"
      onLoginClick={() => setLoginModalVisible(true)}
      onRegisterClick={() => setRegisterModalVisible(true)}
    >
      <div className="layout-content homepage">
        <img src="/images/wheel.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg-2.svg" className="right-main-background" alt="right bg" />

        <HomeLoginModal
          isVisible={loginModalVisible}
          onRegister={onSelectRegister}
          onClose={() => setLoginModalVisible(false)}
        />
        <HomeRegisterModal
          initialUserType={initialUserType}
          isVisible={registerModalVisible}
          onClose={() => setRegisterModalVisible(false)}
        />

        <HomeLanding />

        <HomeRecentlyAddedProperties />

        <HomeHowDoesItWork
          selectedUserType={selectedUserType}
          setSelectedUserType={setSelectedUserType}
        />

        <HomeSectionDivider
          title="TENANTS"
          description="Find your new home online"
          link="/properties"
        />

        <HomeAreasOfExpertise />

        {selectedUserType === userTypes.LANDLORD && <HomeWhyChooseDigiRentOverAnyAgency />}

        <HomeExploreOurMostPopularCities />

        <HomeSectionDivider
          title="LANDLORDS"
          description="Find your renters online"
          link="/tenants"
        />

        <HomeBlog />

        <CookieOverlay isAccepted={isCookieAccepted} onAccept={() => setIsCookieAccepted(true)} />
      </div>
    </HomePageWrapper>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

export default Page;
