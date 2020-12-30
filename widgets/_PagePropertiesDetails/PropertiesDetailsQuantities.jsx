import { upperFirst } from 'lodash';
import { formatDate } from 'shared/functions';

const PropertiesDetailsQuantities = ({ property }) => (
  <div className="property-other-info">
    <div className="row">
      <div className="col-12 col-sm-6 col-xl-6">
        <div className="item item-price">
          <img src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          <div className="divider left" />
          <p className="main-desc dark-gray2 main-title">Monthly Price</p>
          <div className="divider right" />
          <p className="main-desc text-primary">€{property?.monthlyPrice}</p>
        </div>

        <div className="item item-price">
          <img src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          <div className="divider left" />
          <p className="main-desc dark-gray2 main-title">Utilities Price</p>
          <div className="divider right" />
          <p className="main-desc text-primary">€{property?.utilitiesPrice}</p>
        </div>

        {/* <div className="item item-price">
          <img src="/images/icon/icon-euro-primary.svg" height="20" width="20" alt="icon" />
          <div className="divider left" />
          <p className="main-desc dark-gray2 main-title">Security Deposit</p>
          <div className="divider right" />
          <p className="main-desc text-primary">€{property?.utilitiesPrice}</p>
        </div> */}
      </div>

      <div className="col-12 col-sm-6 col-xl-6">
        <div className="item item-others">
          <div className="d-flex align-items-center justify-content-between">
            <img src="/images/icon/icon-bed-primary.svg" height="20" width="20" alt="icon" />
            <p className="ml-2 main-desc dark-gray2">{property?.bedrooms}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between ml-4">
            <img src="/images/icon/icon-bath-tub-primary.svg" height="20" width="20" alt="icon" />
            <p className="ml-2 main-desc dark-gray2">{property?.bathrooms}</p>
          </div>
        </div>

        <div className="item item-others">
          <div className="d-flex align-items-center justify-content-between">
            <div className="sqft-icon">sqft</div>
            <p className="ml-2 main-desc dark-gray2">{property?.size}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between ml-4">
            <img src="/images/icon/icon-couch-primary.svg" height="20" width="20" alt="icon" />
            <p className="ml-1 main-desc dark-gray2">{upperFirst(property?.furnishType)}</p>
          </div>
        </div>

        <div className="item item-date">
          <img src="/images/icon/icon-calendar-primary.svg" height="20" width="20" alt="icon" />
          <p className="main-desc dark-gray2 ml-3">
            {`${formatDate(property?.availableFrom)} — ${formatDate(property?.availableTo)}`}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PropertiesDetailsQuantities;
