import FormCheckbox from 'components/FormCheckbox/index';
import { useState } from 'react';

const PropertyAddAmenities = ({ amenities }) => {
  const [moreAmenitiesValue, setMoreAmenitiesValue] = useState({});
  const [moreAmenitiesVisible, setMoreAmenitiesVisible] = useState(false);

  const toggleMoreAmenities = (key, value) => {
    setMoreAmenitiesValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const toggleAmenitiesVisible = () => setMoreAmenitiesVisible((value) => !value);

  return (
    <div className="main-box amenities mt-5">
      <span className="title d-block text-center">AMENITIES</span>
      <span className="subtitle d-block mt-2 text-center">Mark what your place offers</span>

      <hr />

      {amenities.map(({ id, title }) => (
        <FormCheckbox key={id} name="amenities" value={id} label={title} classNames="field-item" />
      ))}

      {/* {moreAmenitiesVisible && (
        <>
          {otherAmenities.map(({ key, label }) => (
            <Checkbox
              name="amenities"
              value={moreAmenitiesValue[key]}
              onChange={(value) => toggleMoreAmenities(key, value)}
              classNames="field-item"
              label={label}
            />
          ))}
        </>
      )} */}

      <button
        type="button"
        className="button btn-show-more d-block mx-auto mt-2"
        onClick={toggleAmenitiesVisible}
      >
        {moreAmenitiesVisible ? (
          <img src="/images/icon/icon-caret-up-white.svg" alt="icon" />
        ) : (
          <img src="/images/icon/icon-caret-down-white.svg" alt="icon" />
        )}
      </button>
    </div>
  );
};

export default PropertyAddAmenities;
