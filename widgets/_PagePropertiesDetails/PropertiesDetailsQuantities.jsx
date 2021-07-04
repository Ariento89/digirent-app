import { upperFirst } from 'lodash';
import { formatDate } from 'shared/functions';

const PropertiesDetailsQuantities = ({ property }) => (
  <div className="property-other-info">
    <p className="main-desc main-desc-header text-primary">Information</p>
    <div className="row">
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img className="mr-2" src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          Monthly Price:
          <span className="ml-2">€{property?.apartment.monthlyPrice}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img className="mr-2" src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          Utilities Price:
          <span className="ml-2">€{property?.apartment.utilitiesPrice}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-bed-primary.svg" height="20" width="20" alt="icon" />
          <span className="ml-2">{property?.apartment.bedrooms}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-bath-tub-primary.svg" height="20" width="20" alt="icon" />
          <span className="ml-2">{property?.apartment.bathrooms}</span>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <div className="sqft-icon">sqft</div>
          <p className="ml-2">{property?.apartment.size}</p>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-couch-primary.svg" height="20" width="20" alt="icon" />
          <p className="ml-2">{upperFirst(property?.apartment.furnishType)}</p>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mb-4">
        <div className="d-flex align-items-center">
          <img src="/images/icon/icon-calendar-primary.svg" height="20" width="20" alt="icon" />
          <p className="ml-2">
            {`${formatDate(property?.apartment.availableFrom)} — ${formatDate(property?.apartment.availableTo)}`}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PropertiesDetailsQuantities;
