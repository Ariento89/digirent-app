/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthentication } from 'hooks/useAuthentication';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes, userTypes } from 'shared/types';
import CookieOverlay from 'widgets/CookieOverlay/index';
import AreasOfExpertise from 'widgets/_PageHome/AreasOfExpertise';
import Blog from 'widgets/_PageHome/Blog';
import ExploreOurMosePopularCities from 'widgets/_PageHome/ExploreOurMosePopularCities';
import HomePageWrapper from 'widgets/_PageHome/HomePageWrapper';
import HowDoesItWork from 'widgets/_PageHome/HowDoesItWork';
import Landing from 'widgets/_PageHome/Landing';
import LoginModal from 'widgets/_PageHome/LoginModal';
import RecentlyAddedProperties from 'widgets/_PageHome/RecentlyAddedProperties';
import RegisterModal from 'widgets/_PageHome/RegisterModal';
import SectionDivider from 'widgets/_PageHome/SectionDivider';
import WhyChooseDigiRentOverAnyAgency from 'widgets/_PageHome/WhyChooseDigiRentOverAnyAgency';

const Page = () => {
  // STATES
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [initialUserType, setInitialUserType] = useState(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { sessionTimedOut, clearSessionTimeOut } = useAuthentication();

  // METHODS
  useEffect(() => {
    if (sessionTimedOut) {
      addToast('Session timed out. Please login again.', toastTypes.WARNING);
      clearSessionTimeOut();
    }
  }, [sessionTimedOut]);

  const onSelectRegister = (userType) => {
    setInitialUserType(userType);
    setRegisterModalVisible(true);
  };

  return (
    <HomePageWrapper
      title="DigiRent"
      onLoginClick={() => setLoginModalVisible(true)}
      onRegisterClick={() => setRegisterModalVisible(true)}
    >
      <div className="layout-content homepage">
        <img src="/images/wheel.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg-2.svg" className="right-main-background" alt="right bg" />

        <LoginModal
          isVisible={loginModalVisible}
          onRegister={onSelectRegister}
          onClose={() => setLoginModalVisible(false)}
        />
        <RegisterModal
          initialUserType={initialUserType}
          isVisible={registerModalVisible}
          onClose={() => setRegisterModalVisible(false)}
        />

        <Landing />

        <RecentlyAddedProperties />

        <HowDoesItWork
          selectedUserType={selectedUserType}
          setSelectedUserType={setSelectedUserType}
        />

        <SectionDivider
          title="TENANTS"
          description="Find your new home online"
          link="/property-list"
        />

        <AreasOfExpertise />

        {selectedUserType === userTypes.LANDLORD && <WhyChooseDigiRentOverAnyAgency />}

        <ExploreOurMosePopularCities />

        <SectionDivider
          title="LANDLORDS"
          description="Find your renters online"
          link="/tenants-list"
        />

        <Blog />

        <CookieOverlay isAccepted={isCookieAccepted} onAccept={() => setIsCookieAccepted(true)} />
      </div>
    </HomePageWrapper>
  );
};

export default Page;
