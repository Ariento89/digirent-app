import { useState } from 'react';
import { userTypes } from 'shared/types';
import CookieOverlay from 'widgets/CookieOverlay/index';
import AreasOfExpertise from 'widgets/HomePage/AreasOfExpertise';
import Blog from 'widgets/HomePage/Blog';
import ExploreOurMosePopularCities from 'widgets/HomePage/ExploreOurMosePopularCities';
import HomePageWrapper from 'widgets/HomePage/HomePageWrapper';
import HowDoesItWork from 'widgets/HomePage/HowDoesItWork';
import Landing from 'widgets/HomePage/Landing';
import LoginModal from 'widgets/HomePage/LoginModal';
import RecentlyAddedProperties from 'widgets/HomePage/RecentlyAddedProperties';
import RegisterModal from 'widgets/HomePage/RegisterModal';
import SectionDivider from 'widgets/HomePage/SectionDivider';
import WhyChooseDigiRentOverAnyAgency from 'widgets/HomePage/WhyChooseDigiRentOverAnyAgency';

const Page = () => {
  // STATES
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(userTypes.TENANT);
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [initialUserType, setInitialUserType] = useState(null);

  // METHODS
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
