import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import TableHeader from 'widgets/TableHeader/index';
import TenantsInfo from './widgets/TenantsInfo';

const TenantsSearchResult = ({ searchResultRef, tenants, status, errors, onAboutMe }) => (
  <div className="container tenants">
    <Spinner loadingText="Searching tenants..." isLoading={status === request.REQUESTING}>
      <div ref={searchResultRef} className="rental-houses">
        <h3 className="main-title">
          TENANTS IN THE <span className="text-primary font-weight-bold">INDIA</span>
        </h3>
        <p className="main-subtitle mt-1 mt-md-2 dark-gray">
          {tenants.length} NEW TENANTS IN INDIA IN THE LAST 30 DAYS
        </p>

        {status === request.SUCCESS && <TableHeader classNames="rental-houses-table-header mt-5" />}

        {!!errors?.length && errors?.map((error) => <FieldError key={error} error={error} />)}

        <div className="row list">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="col-12 col-md-6 col-xl-4">
              <TenantsInfo
                firstName={tenant.firstName}
                age={12}
                profilePercentage={tenant.profilePercentage || 0}
                city={tenant.city || 'India'}
                houseType={tenant.houseType || 'Apartment'}
                maxBudget={tenant.maxBudget || 500}
                onAboutMe={() => onAboutMe(tenant)}
              />
            </div>
          ))}

          {/* EMPTY */}
          {status === request.SUCCESS && tenants?.length === 0 && (
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

        <Pagination className="mt-5" />
      </div>
    </Spinner>
  </div>
);

export default TenantsSearchResult;
