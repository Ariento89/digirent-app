/* eslint-disable react-hooks/exhaustive-deps */
import { useProperties } from 'hooks/useProperties';
import { usePropertyApplications } from 'hooks/usePropertyApplications';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddedProperties from 'widgets/_PageMyProperties/MyPropertiesAddedProperties';
import MyPropertiesAddPropertyModal from 'widgets/_PageMyProperties/MyPropertiesAddPropertyModal';
import MyPropertiesApplicationsModal from 'widgets/_PageMyProperties/MyPropertiesApplicationsModal';
import MyPropertiesDeleteConfirmationModal from 'widgets/_PageMyProperties/MyPropertiesDeleteConfirmationModal';
import MyPropertiesLanding from 'widgets/_PageMyProperties/MyPropertiesLanding';
import MyPropertiesPropertySelectionModal from 'widgets/_PageMyProperties/MyPropertiesPropertySelectionModal';

const Page = () => {
  // STATES
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = useState(false);
  const [addPropertyModalVisible, setAddPropertyModalVisible] = useState(false);
  const [propertySelectionModalVisible, setPropertySelectionModalVisible] = useState(false);
  const [seeReactionModalVisible, setSeeReactionModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchProperties, status: propertiesStatus, errors: propertiesErrors } = useProperties();
  const {
    fetchApplicationsForProperties,
    status: applicationsStatus,
    errors: applicationsErrors,
  } = usePropertyApplications();

  // METHODS
  useEffect(() => {
    fetchProperties(null, {
      onSuccess: onFetchPropertiesSuccess,
      onError: onFetchPropertiesError,
    });
  }, []);

  const onFetchPropertiesSuccess = ({ response }) => {
    setProperties(response);
  };

  const onFetchPropertiesError = () => {
    addToast('An error occurred while fetching properties.', toastTypes.ERROR);
  };

  const onDeleteProperty = (property) => {
    setSelectedProperty(property);
    setDeleteConfirmationModalVisible(true);
  };

  const onAddProperty = () => setAddPropertyModalVisible(true);

  const onViewApplications = (property) => {
    setSelectedProperty(property);
    setSeeReactionModalVisible(true);

    setApplications([]);
    fetchApplicationsForProperties(
      { propertyId: property.id },
      {
        onSuccess: onFetchApplicationsSuccess,
        onError: onFetchApplicationsError,
      },
    );
  };

  const onFetchApplicationsSuccess = ({ response }) => {
    setApplications(response);
  };

  const onFetchApplicationsError = () => {
    addToast("An error occurred while fetching property's applications.", toastTypes.ERROR);
  };

  const onUpdateApplication = (index, application) => {
    setApplications((previousApplications) => {
      const newApplications = cloneDeep(previousApplications);
      newApplications[index] = application;

      return newApplications;
    });
  };

  return (
    <>
      <PageWrapper title="DigiRent - My Properties" pageName="my-properties">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <MyPropertiesLanding onAddProperty={onAddProperty} />

        <MyPropertiesAddedProperties
          properties={properties}
          status={propertiesStatus}
          errors={propertiesErrors}
          onViewApplications={onViewApplications}
          onDeleteProperty={onDeleteProperty}
        />
      </PageWrapper>

      <MyPropertiesApplicationsModal
        applications={applications}
        status={applicationsStatus}
        errors={applicationsErrors}
        onUpdateApplication={onUpdateApplication}
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
