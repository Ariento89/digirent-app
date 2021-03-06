import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { useState } from 'react';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import PropertyInfo from 'widgets/PropertyInfo/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import TableHeader from 'widgets/TableHeader/index';

const PropertiesSearchResult = ({ searchResultRef, properties, status, errors }) => {
  // STATES
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  // METHODS
  const onPageChange = (newList, pagination) => {
    setList(newList);
    setPaginationData(pagination);
  };

  return (
    <div className="container">
      <Spinner loadingText="Searching properties..." isLoading={status === request.REQUESTING}>
        <div ref={searchResultRef} className="rental-houses">
          <h3 className="main-title">
            RENTAL HOUSE IN <span className="text-primary font-weight-bold">INDIA</span>
          </h3>
          <p className="main-subtitle mt-1 mt-md-2 dark-gray">
            {properties.length} NEW RENTAL PROPERTIES IN INDIA IN THE LAST 30 DAYS
          </p>

          {!!errors?.length && (
            <div className="my-3">
              {errors?.map((error) => (
                <FieldError error={error} />
              ))}
            </div>
          )}

          {/* LIST */}
          {status === request.SUCCESS && !!properties?.length && (
            <>
              <TableHeader
                classNames="rental-houses-table-header mt-5"
                currentPage={paginationData.currentPage}
                maxPage={paginationData.currentPage}
              />

              <div className="row list">
                {list.map((property) => (
                  <div key={property.id} className="col-12 col-md-6 col-lg-4 item">
                    <PropertyInfo
                      link={`/properties/${property.id}`}
                      houseImage="/images/house-sample-1.jpg"
                      name={property.name}
                      address={property.address}
                      rentFee={property.monthlyPrice}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                    />
                  </div>
                ))}
              </div>

              <Pagination className="mt-5" list={properties} onPageChange={onPageChange} />
            </>
          )}

          {/* EMPTY */}
          {status === request.SUCCESS && !properties?.length && (
            <StateList
              className="mx-auto"
              title="LIST IS EMPTY"
              description="No properies found."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {status === request.ERROR && (
            <StateList
              className="mx-auto"
              title="OOPS!"
              description="An error ocurred while fetching properties."
              type={stateListTypes.ERROR}
            />
          )}
        </div>
      </Spinner>
    </div>
  );
};

export default PropertiesSearchResult;
