import { Select } from 'components/Select/index';
import { useState } from 'react';

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
  { name: 'Option 4', value: 4 },
];

const SearchFormPropertyList = () => {
  const [location, setLocation] = useState(null);
  const [typeOfHouse, setTypeOfHouse] = useState(null);
  const [rentalPrice, setRentalPrice] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [amenities, setAmenities] = useState(null);
  const [sqft, setSqft] = useState(null);

  return (
    <div className="SearchForm">
      <div className="outer-box">
        <div className="inner-box">
          <div className="main-icon rounded-icon not-responsive">
            <img src="/images/icon/icon-people-primary.svg" alt="item icon" />
          </div>

          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4">
              <p className="main-desc pb-2">Location</p>
              <Select
                value={location}
                onChange={(value) => setLocation(value)}
                options={options}
                placeholder="Location"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-sm-0">
              <p className="main-desc pb-2">Type of house</p>
              <Select
                value={typeOfHouse}
                onChange={(value) => setTypeOfHouse(value)}
                options={options}
                placeholder="Type of house"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-0">
              <p className="main-desc pb-2">Rental Price</p>
              <Select
                value={rentalPrice}
                onChange={(value) => setRentalPrice(value)}
                options={options}
                placeholder="Rental Price"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
              <p className="main-desc pb-2">Availability</p>
              <Select
                value={availability}
                onChange={(value) => setAvailability(value)}
                options={options}
                placeholder="Availability"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
              <p className="main-desc pb-2">Amenities</p>
              <Select
                value={amenities}
                onChange={(value) => setAmenities(value)}
                options={options}
                placeholder="Amenities"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
              <p className="main-desc pb-2">Sqft</p>
              <Select
                value={sqft}
                onChange={(value) => setSqft(value)}
                options={options}
                placeholder="Sqft"
              />
            </div>
          </div>

          <button className="button min-width btn-search">SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default SearchFormPropertyList;
