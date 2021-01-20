import Spinner from 'components/Spinner/index';
import { useState } from 'react';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import TableHeader from 'widgets/TableHeader/index';
import TenantsInfo from './widgets/TenantsInfo';

const TenantsSearchResult = ({ searchResultRef, tenants, status, onAboutMe }) => {
  // STATES
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  // METHODS
  const onPageChange = (newList, pagination) => {
    setList(newList);
    setPaginationData(pagination);
  };

  return (
    <div className="container tenants">
      <Spinner loadingText="Searching tenants..." isLoading={status === request.REQUESTING}>
        <div ref={searchResultRef} className="rental-houses">
          <h3 className="main-title">
            TENANTS IN THE <span className="text-primary font-weight-bold">INDIA</span>
          </h3>
          <p className="main-subtitle mt-1 mt-md-2 dark-gray">
            {tenants.length} NEW TENANTS IN INDIA IN THE LAST 30 DAYS
          </p>

          {/* LIST */}
          {status === request.SUCCESS && !!tenants?.length && (
            <>
              <TableHeader
                classNames="rental-houses-table-header mt-5"
                currentPage={paginationData.currentPage}
                maxPage={paginationData.currentPage}
              />

              <div className="row list">
                {list.map((tenant) => (
                  <div key={tenant.id} className="col-12 col-md-6 col-xl-4">
                    <TenantsInfo
                      firstName={tenant.firstName}
                      age={12}
                      profilePercentage={tenant.profilePercentage || 0}
                      city={tenant.city || 'India'}
                      houseType={tenant.houseType || 'Apartment'}
                      maxBudget={tenant.maxBudget || 500}
                      profileImageUrl={tenant.profileImageUrl}
                      onAboutMe={() => onAboutMe(tenant)}
                    />
                  </div>
                ))}
              </div>

              <Pagination className="mt-5" list={tenants} onPageChange={onPageChange} />
            </>
          )}

          {/* EMPTY */}
          {status === request.SUCCESS && !tenants?.length && (
            <StateList
              className="mx-auto"
              title="LIST IS EMPTY"
              description="No tenants found."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {status === request.ERROR && (
            <StateList
              className="mx-auto"
              title="OOPS!"
              description="An error ocurred while fetching tenants."
              type={stateListTypes.ERROR}
            />
          )}
        </div>
      </Spinner>
    </div>
  );
};

export default TenantsSearchResult;
