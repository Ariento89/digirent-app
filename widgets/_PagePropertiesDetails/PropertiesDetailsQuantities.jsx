import { upperFirst } from 'lodash';
import { formatDate } from 'shared/functions';

const PropertiesDetailsQuantities = ({ property }) => (
  <div className="property-other-info">
    <div className="row">
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img className="mr-2" src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          Monthly Price:
          <span className="ml-2">€{property?.monthlyPrice}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img className="mr-2" src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          Utilities Price:
          <span className="ml-2">€{property?.utilitiesPrice}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-bed-primary.svg" height="20" width="20" alt="icon" />
          <span className="ml-2">{property?.bedrooms}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-bath-tub-primary.svg" height="20" width="20" alt="icon" />
          <span className="ml-2">{property?.bathrooms}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <div className="sqft-icon">sqft</div>
          <p className="ml-2">{property?.size}</p>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-couch-primary.svg" height="20" width="20" alt="icon" />
          <p className="ml-2">{upperFirst(property?.furnishType)}</p>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-calendar-primary.svg" height="20" width="20" alt="icon" />
          <p className="ml-2">
            {`${formatDate(property?.availableFrom)} — ${formatDate(property?.availableTo)}`}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PropertiesDetailsQuantities;
