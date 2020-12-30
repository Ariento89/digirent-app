import FieldError from 'components/FieldError/FieldError';
import Spinner from 'components/Spinner/index';
import Pagination from 'widgets/Pagination/index';
import PropertyInfo from 'widgets/PropertyInfo/index';
import TableHeader from 'widgets/TableHeader/index';

const PropertiesSearchResult = ({ searchResultRef, properties, loading, errors }) => (
  <div className="container">
    <Spinner loadingText="Searching properties..." isLoading={loading}>
      <div ref={searchResultRef} className="rental-houses">
        <h3 className="main-title">
          RENTAL HOUSE IN <span className="text-primary font-weight-bold">INDIA</span>
        </h3>
        <p className="main-subtitle mt-1 mt-md-2 dark-gray">
          {properties.length} NEW RENTAL PROPERTIES IN INDIA IN THE LAST 30 DAYS
        </p>

        <TableHeader classNames="rental-houses-table-header mt-5" />

        {!!errors?.length && errors?.map((error) => <FieldError key={error} error={error} />)}

        <div className="row list">
          {properties.map((property) => (
            <div key={property.id} className="col-12 col-md-6 col-lg-4 item">
              <PropertyInfo
                link={`properties/${property.id}`}
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

        <Pagination className="mt-5" />
      </div>
    </Spinner>
  </div>
);

export default PropertiesSearchResult;
