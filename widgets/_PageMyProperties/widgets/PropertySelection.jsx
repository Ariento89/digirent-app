/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { useEffect, useState } from 'react';

// TODO: Display photo of properties
const PropertySelection = ({ selectedProperty, properties, onSelect }) => {
  // STATES
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // METHODS
  useEffect(() => {
    if (properties.length && !selectedProperty) {
      onSelect(properties?.[0]);
    }
  }, [selectedProperty, properties]);

  const toggleDropdown = () => {
    setIsDropdownVisible((value) => !value);
  };

  const onSelectProperty = (property) => {
    onSelect(property);
    setIsDropdownVisible(false);
  };

  return (
    <div className="property-selection mt-4">
      <div className="initial-value">
        <div className="item">
          <div className="house-photo" />
          <div className="house-info">
            <span className="title">{selectedProperty?.name}</span>
            <span className="main-desc text-primary font-weight-light mt-1">LANDLORD</span>
          </div>
        </div>
        <button className="btn-dropdown" onClick={toggleDropdown}>
          <img src="/images/icon/icon-caret-down-white.svg" alt="icon" />
        </button>
      </div>

      <div className={cn('property-list', { 'd-none': !isDropdownVisible })}>
        {properties.map((property) => (
          <div
            key={property.id}
            className={cn('item', { selected: selectedProperty?.id === property.id })}
            onClick={() => onSelectProperty(property)}
          >
            <div className="house-photo" />
            <div className="house-info">
              <span className="title">{property.name}</span>
              <span className="main-desc text-primary font-weight-light mt-1">LANDLORD</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySelection;
