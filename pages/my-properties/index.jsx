/* eslint-disable react-hooks/exhaustive-deps */
import { useProperties } from 'hooks/useProperties';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddedProperties from 'widgets/_PageMyProperties/MyPropertiesAddedProperties';
import MyPropertiesAddPropertyModal from 'widgets/_PageMyProperties/MyPropertiesAddPropertyModal';
import MyPropertiesDeleteConfirmationModal from 'widgets/_PageMyProperties/MyPropertiesDeleteConfirmationModal';
import MyPropertiesLanding from 'widgets/_PageMyProperties/MyPropertiesLanding';
import MyPropertiesPropertySelectionModal from 'widgets/_PageMyProperties/MyPropertiesPropertySelectionModal';
import MyPropertiesApplicationsModal from 'widgets/_PageMyProperties/MyPropertiesApplicationsModal';

const Page = () => {
  // STATES
  const [properties, setProperties] = useState([]);
  const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = useState(false);
  const [addPropertyModalVisible, setAddPropertyModalVisible] = useState(false);
  const [propertySelectionModalVisible, setPropertySelectionModalVisible] = useState(false);
  const [seeReactionModalVisible, setSeeReactionModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();

  // METHODS
  const onFetchSuccess = ({ response }) => {
    setProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while fetching properties.', toastTypes.ERROR);
  };

  useEffect(() => {
    fetchProperties(null, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  }, []);

  const onDeleteProperty = (property) => {
    setSelectedProperty(property);
    setDeleteConfirmationModalVisible(true);
  };

  const onAddProperty = () => setAddPropertyModalVisible(true);

  const onViewApplications = (property) => {
    setSelectedProperty(property);
    setSeeReactionModalVisible(true);
  };

  return (
    <>
      <PageWrapper title="DigiRent - My Properties" pageName="my-properties">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <MyPropertiesLanding onAddProperty={onAddProperty} />

        <MyPropertiesAddedProperties
          properties={properties}
          loading={status === request.REQUESTING}
          errors={errors}
          onViewApplications={onViewApplications}
          onDeleteProperty={onDeleteProperty}
        />
      </PageWrapper>

      <MyPropertiesApplicationsModal
        property={selectedProperty}
        isVisible={seeReactionModalVisible}
        onClose={() => setSeeReactionModalVisible(false)}
      />

      <MyPropertiesDeleteConfirmationModal
        property={selectedProperty}
        isVisible={deleteConfirmationModalVisible}
        onClose={() => setDeleteConfirmationModalVisible(false)}
      />

      <MyPropertiesAddPropertyModal
        properties={properties}
        isVisible={addPropertyModalVisible}
        onClose={() => setAddPropertyModalVisible(false)}
        showPropertySelection={() => setPropertySelectionModalVisible(true)}
      />

      <MyPropertiesPropertySelectionModal
        properties={properties}
        isVisible={propertySelectionModalVisible}
        onClose={() => setPropertySelectionModalVisible(false)}
      />
    </>
  );
};

export default Page;
