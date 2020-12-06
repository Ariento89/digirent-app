import { Select } from 'components/Select/index';
import { useState } from 'react';

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
  { name: 'Option 4', value: 4 },
];

const SearchFormTenantList = () => {
  const [location, setLocation] = useState(null);
  const [typeOfHouse, setTypeOfHouse] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [tenantType, setTenantType] = useState(null);

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
              <p className="main-desc pb-2">Max budget</p>
              <Select
                value={maxBudget}
                onChange={(value) => setMaxBudget(value)}
                options={options}
                placeholder="Max budget"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
              <p className="main-desc pb-2">Gender</p>
              <Select
                value={gender}
                onChange={(value) => setGender(value)}
                options={options}
                placeholder="Gender"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
              <p className="main-desc pb-2">Age</p>
              <Select
                value={age}
                onChange={(value) => setAge(value)}
                options={options}
                placeholder="Age"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-4">
              <p className="main-desc pb-2">Tenant type</p>
              <Select
                value={tenantType}
                onChange={(value) => setTenantType(value)}
                options={options}
                placeholder="Tenant type"
              />
            </div>
          </div>

          <button className="button min-width btn-search">SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default SearchFormTenantList;
