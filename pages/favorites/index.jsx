import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useProperties } from 'hooks/useProperties';
import { useMe } from 'hooks/useMe';
import { useToasts } from 'react-toast-notifications';
import { toastTypes, request } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import PropertyInfo from 'widgets/PropertyInfo/index';
import Spinner from 'components/Spinner/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';

const Page = () => {
  const [properties, setProperties] = useState([]);
  const { addToast } = useToasts();
  const { fetchProperties, status, errors } = useProperties();
  const { me } = useMe();

  useEffect(() => {
    fetchProperties({ favorite: true }, {
      onSuccess: onFetchSuccess,
      onError: onFetchError,
    });
  }, []);

  const onFetchSuccess = ({ response }) => {
    setProperties(response);
  };

  const onFetchError = () => {
    addToast('An error occurred while getting favorite properties.', toastTypes.ERROR);
  };

  return (
    <>
      <PageWrapper title="Favorites" pageName="favorites">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container-fluid container-lg">
          <h3 className="main-title">FAVORITE LIST</h3>
          <div className="mt-5">
            <Spinner loadingText="Searching properties..." isLoading={status === request.REQUESTING}>
              <div className={cn("row list flex-1 mt-0", {'h-full': request.SUCCESS && !properties?.length})}>
                {status === request.SUCCESS && !!properties?.length && (
                  <>
                    {properties.map((property) => (
                      <div key={property.apartment.id} className="item col-md-12 col-lg-6 col-xl-4">
                        <PropertyInfo
                          link={`/properties/${property.apartment.id}`}
                          houseImage={property.apartment.images}
                          name={property.apartment.name}
                          address={property.apartment.state}
                          rentFee={property.apartment.monthlyPrice}
                          houseType={property.apartment.houseType}
                          bedrooms={property.apartment.bedrooms}
                          bathrooms={property.apartment.bathrooms}
                          size={property.apartment.size}
                          availableFrom={property.apartment.availableFrom}
                          propId={property.apartment.id}
                          context={property.context}
                        />
                      </div>
                    ))}
                  </>
                )}

                {status === request.SUCCESS && !properties?.length && (
                  <StateList
                    className="mx-auto"
                    title="LIST IS EMPTY"
                    description="No properies found."
                    type={stateListTypes.EMPTY}
                  />
                )}
              </div>
            </Spinner>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Page;
