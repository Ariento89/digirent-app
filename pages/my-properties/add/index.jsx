/* eslint-disable react-hooks/exhaustive-deps */
import { useAmenities } from 'hooks/useAmenities';
import { useProperties } from 'hooks/useProperties';
import { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MyPropertiesAddForm from 'widgets/_PageMyPropertiesAdd/MyPropertiesAddForm';

const Page = () => {
  // STATES
  const [amenities, setAmenities] = useState([]);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const {
    createProperty,
    status: propertiesRequestStatus,
    errors: propertiesRequestErrors,
  } = useProperties();
  const { uploadImage, status: uploadImage1RequestStatus } = useProperties();
  const {
    fetchAmenities,
    status: amenitiesRequestStatus,
    errors: amenitiesRequestErrors,
  } = useAmenities();

  // METHODS
  const onFetchAmenitiesSuccess = ({ response }) => {
    setAmenities(
      response.map(({ id, title }) => ({
        id,
        title,
      })),
    );
  };

  useEffect(() => {
    fetchAmenities({
      onSuccess: onFetchAmenitiesSuccess,
      onError: () => setAmenities([]),
    });
  }, []);

  const getLoadingText = useCallback(() => {
    let loadingText = '';

    if (propertiesRequestStatus === request.REQUESTING) {
      loadingText = 'Creating property...';
    } else if (amenitiesRequestStatus === request.REQUESTING) {
      loadingText = 'Fetching amenities...';
    }

    return loadingText;
  }, [propertiesRequestStatus, amenitiesRequestStatus]);

  const isLoading = useCallback(
    () =>
      [uploadImage1RequestStatus, propertiesRequestStatus, amenitiesRequestStatus].includes(
        request.REQUESTING,
      ),
    [uploadImage1RequestStatus, propertiesRequestStatus, amenitiesRequestStatus],
  );

  const onCreateSuccess = () => {
    addToast('Successfully created property.', toastTypes.SUCCESS);
  };

  const onCreateError = () => {
    addToast('An error occurred while creating your property.', toastTypes.ERROR);
  };

  const onSubmit = ({ image1, image2, image3, image4, image5, image6, image7, image8, ...data }) => {
    // propertyId, file
    createProperty(data, {
      onSuccess: ({ response }) => {
        onCreateSuccess();

        const { id } = response;

        uploadImage(
          { propertyId: id, image: image1 },
          {
            onSuccess: () => {
              onImageUploadSuccess('First image');

              uploadImage(
                { propertyId: id, image: image2 },
                {
                  onSuccess: () => {
                    onImageUploadSuccess('Second image');

                    uploadImage(
                      { propertyId: id, image: image3 },
                      {
                        onSuccess: () => {
                          onImageUploadSuccess('Third image');

                          uploadImage(
                            { propertyId: id, image: image4 },
                            {
                              onSuccess: () => {
                                onImageUploadSuccess('Forth image');

                                uploadImage(
                                  { propertyId: id, image: image5 },
                                  {
                                    onSuccess: () => {
                                      onImageUploadSuccess('Fifth image');

                                      uploadImage(
                                        { propertyId: id, image: image6 },
                                        {
                                          onSuccess: () => {
                                            onImageUploadSuccess('Sixth image');

                                            uploadImage(
                                              { propertyId: id, image: image7 },
                                              {
                                                onSuccess: () => {
                                                  onImageUploadSuccess('Seventh image');

                                                  uploadImage(
                                                    { propertyId: id, image: image8 },
                                                    {
                                                      onSuccess: () => {
                                                        onImageUploadSuccess('Eighth image');
                                                      },
                                                      onError: () => {
                                                        onImageUploadError('Eighth image');
                                                      },
                                                    },
                                                  );
                  
                                                },
                                                onError: () => {
                                                  onImageUploadError('Seventh image');
                                                },
                                              },
                                            );
            
                                          },
                                          onError: () => {
                                            onImageUploadError('Sixth image');
                                          },
                                        },
                                      );
      
                                    },
                                    onError: () => {
                                      onImageUploadError('Fifth image');
                                    },
                                  },
                                );
            
                              },
                              onError: () => {
                                onImageUploadError('Forth image');
                              },
                            },
                          );
      
                        },
                        onError: () => {
                          onImageUploadError('Third image');
                        },
                      },
                    );
                  },
                  onError: () => {
                    onImageUploadError('Second image');
                  },
                },
              );
            },
            onError: () => {
              onImageUploadError('First image');
            },
          },
        );
      },
      onError: onCreateError,
    });
  };

  const onImageUploadSuccess = (label) => {
    addToast(`Successfully uploaded your ${label}.`, toastTypes.SUCCESS);
  };

  const onImageUploadError = (label) => {
    addToast(`An error occurred while uploaded ${label}.`, toastTypes.ERROR);
  };

  return (
    <PageWrapper title="DigiRent - Add Property" pageName="my-properties-add">
      <img src="/images/add-property-bg.jpg" className="main-background" alt="background" />

      <div className="container-lg mt-5">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3" />
          <div className="col-12 col-md-8 col-xl-9">
            <p className="main-info-title text-white font-weight-bold">
              <span className="alt text-primary font-weight-light">ADD</span>
              <br />
              PROPERTY
            </p>
          </div>
        </div>

        <MyPropertiesAddForm
          amenities={amenities}
          property={null}
          onSubmit={onSubmit}
          isLoading={isLoading()}
          loadingText={getLoadingText()}
          errors={[...propertiesRequestErrors, ...amenitiesRequestErrors]}
        />
      </div>
    </PageWrapper>
  );
};

export default Page;
