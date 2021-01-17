/* eslint-disable react-hooks/exhaustive-deps */
import { useUsers } from 'hooks/useUsers';
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import TenantsAboutMeModal from 'widgets/_PageTenants/TenantsAboutMeModal';
import TenantsLanding from 'widgets/_PageTenants/TenantsLanding';
import TenantsSearchResult from 'widgets/_PageTenants/TenantsSearchResult';

const Page = () => {
  // STATES
  const [tenants, setTenants] = useState([]);
  const [aboutMeVisible, setAboutMeVisible] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  // REFS
  const searchResultRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchAllTenants, status } = useUsers();

  // METHODS
  useEffect(() => {
    onSearch(null);
  }, []);

  const onSearch = (data) => {
    if (data !== null) {
      searchResultRef.current.scrollIntoView();
    }

    fetchAllTenants(data, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  };

  const onFetchSuccess = ({ response }) => {
    setTenants(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while searching for users.', toastTypes.ERROR);
  };

  const onAboutMe = (tenant) => {
    setSelectedTenant(tenant);
    setAboutMeVisible(true);
  };

  return (
    <>
      <PageWrapper title="DigiRent - Tenants" pageName="tenants">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <TenantsLanding onSubmit={onSearch} />

        <TenantsSearchResult
          searchResultRef={searchResultRef}
          tenants={tenants}
          status={status}
          onAboutMe={onAboutMe}
        />
      </PageWrapper>

      <TenantsAboutMeModal
        tenant={selectedTenant}
        isVisible={aboutMeVisible}
        onClose={() => setAboutMeVisible(false)}
      />
    </>
  );
};

export default Page;
