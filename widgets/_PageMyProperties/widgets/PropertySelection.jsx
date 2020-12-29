import { useState } from 'react';
import cn from 'classnames';

const PropertySelection = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((value) => !value);
  };

  return (
    <div className="property-selection mt-4">
      <div className="initial-value">
        <div className="item">
          <div className="house-photo" />
          <div className="house-info">
            <span className="title">Pahvale Villa</span>
            <span className="main-desc text-primary font-weight-light mt-1">LANDLORD</span>
          </div>
        </div>
        <button className="btn-dropdown" onClick={toggleDropdown}>
          <img src="/images/icon/icon-caret-down-white.svg" alt="icon" />
        </button>
      </div>

      <div className={cn('property-list', { 'd-none': !isDropdownVisible })}>
        {[1, 2, 3].map((key) => (
          <div key={key} className="item" onClick={toggleDropdown}>
            <div className="house-photo" />
            <div className="house-info">
              <span className="title">Pahvale Villa</span>
              <span className="main-desc text-primary font-weight-light mt-1">LANDLORD</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySelection;
