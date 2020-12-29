import { useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddedProperties from 'widgets/_PageMyProperties/MyPropertiesAddedProperties';
import MyPropertiesAddPropertyModal from 'widgets/_PageMyProperties/MyPropertiesAddPropertyModal';
import MyPropertiesDeleteConfirmationModal from 'widgets/_PageMyProperties/MyPropertiesDeleteConfirmationModal';
import MyPropertiesLanding from 'widgets/_PageMyProperties/MyPropertiesLanding';
import MyPropertiesPropertySelectionModal from 'widgets/_PageMyProperties/MyPropertiesPropertySelectionModal';
import MyPropertiesSeeReactionsModal from 'widgets/_PageMyProperties/MyPropertiesSeeReactionsModal';

const Page = () => {
  // STATES
  const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = useState(false);
  const [addPropertyModalVisible, setAddPropertyModalVisible] = useState(false);
  const [propertySelectionModalVisible, setPropertySelectionModalVisible] = useState(false);
  const [seeReactionModalVisible, setSeeReactionModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // METHODS
  const onDeleteProperty = (property) => {
    setSelectedProperty(property);
    setDeleteConfirmationModalVisible(true);
  };

  const onAddProperty = () => setAddPropertyModalVisible(true);

  const onSeeReaction = () => setSeeReactionModalVisible(true);

  return (
    <>
      <PageWrapper title="DigiRent - My Properties" pageName="property">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <MyPropertiesLanding onAddProperty={onAddProperty} />

        <MyPropertiesAddedProperties
          onSeeReaction={onSeeReaction}
          onDeleteProperty={onDeleteProperty}
        />
      </PageWrapper>

      <MyPropertiesSeeReactionsModal
        isVisible={seeReactionModalVisible}
        onClose={() => setSeeReactionModalVisible(false)}
      />

      <MyPropertiesDeleteConfirmationModal
        property={selectedProperty}
        isVisible={deleteConfirmationModalVisible}
        onClose={() => setDeleteConfirmationModalVisible(false)}
      />

      <MyPropertiesAddPropertyModal
        isVisible={addPropertyModalVisible}
        onClose={() => setAddPropertyModalVisible(false)}
        showPropertySelection={() => setPropertySelectionModalVisible(true)}
      />

      <MyPropertiesPropertySelectionModal
        isVisible={propertySelectionModalVisible}
        onClose={() => setPropertySelectionModalVisible(false)}
      />
    </>
  );
};

export default Page;
