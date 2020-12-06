import Checkbox from 'components/Checkbox/index';
import Input from 'components/Input';
import InputDatePicker from 'components/Input/InputDatePicker';
import { Select } from 'components/Select/index';
import Textarea from 'components/Textarea/index';
import { useEffect, useRef, useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
  { name: 'Option 4', value: 4 },
];

const amenities = [
  { key: 'pool', label: 'Pool' },
  { key: 'elevator', label: 'Elevator' },
  { key: 'deck', label: 'Deck' },
  { key: 'gym', label: 'Gym' },
  { key: 'fireplace', label: 'Fireplace' },
  { key: 'dishwasher', label: 'Dishwasher' },
  { key: 'wheelchair', label: 'Wheelchair' },
  { key: 'non_smoking', label: 'Non smoking' },
  { key: 'dogs_allowed', label: 'Dogs Allowed' },
  { key: 'cats_allowed', label: 'Cats Allowed' },
  { key: 'no_pets', label: 'No Pets' },
];

const otherAmenities = [
  { key: 'other1', label: 'Other 1' },
  { key: 'other2', label: 'Other 2' },
  { key: 'other3', label: 'Other 3' },
  { key: 'other4', label: 'Other 4' },
];

const Page = () => {
  const [type, setType] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [furnishType, setFurnishType] = useState(null);
  const [amenitiesValue, setAmenitiesValue] = useState({});
  const [moreAmenitiesValue, setMoreAmenitiesValue] = useState({});
  const [moreAmenitiesVisible, setMoreAmenitiesVisible] = useState(false);
  const [isSponsorChecked, setIsSponsorChecked] = useState(false);

  const inputImage1 = useRef(null);
  const inputImage2 = useRef(null);
  const inputImage3 = useRef(null);

  useEffect(() => {
    let data = {};
    amenities.forEach(({ key }) => {
      data[key] = false;
    });
    setAmenitiesValue(data);

    data = {};
    otherAmenities.forEach(({ key }) => {
      data[key] = false;
    });
    setMoreAmenitiesValue(data);
  }, []);

  const toggleAmenities = (key, value) => {
    setAmenitiesValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const toggleMoreAmenities = (key, value) => {
    setMoreAmenitiesValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const toggleAmenitiesVisible = () => setMoreAmenitiesVisible((value) => !value);

  return (
    <PageWrapper title="DigiRent - Property" pageName="property-add">
      <img src="/images/add-property-bg.jpg" className="main-background" alt="background" />

      <div className="container-lg mt-5">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3" />
          <div className="col-12 col-md-8 col-xl-9">
            <p className="main-info-title text-white font-weight-bold">
              <span className="alt text-primary font-weight-light">ADD</span>
              <br />
              PROPERTY
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-xl-3">
            <div className="main-box info-quantity">
              <Select
                classNames="field-item"
                value={type}
                onChange={(value) => setType(value)}
                options={options}
                placeholder="Type"
              />
              <Select
                classNames="field-item"
                value={bedrooms}
                onChange={(value) => setBedrooms(value)}
                options={options}
                placeholder="Bedrooms"
              />
              <Select
                classNames="field-item"
                value={bathrooms}
                onChange={(value) => setBathrooms(value)}
                options={options}
                placeholder="Bathrooms"
              />
              <Select
                classNames="field-item"
                value={furnishType}
                onChange={(value) => setFurnishType(value)}
                options={options}
                placeholder="Furnish Type"
              />
              <Input classNames="field-item" placeholder="Sqft" />
              <InputDatePicker
                classNames="field-item"
                placeholder="Availability Per (Date) From"
                rightIcon="icon-calendar-gray"
              />
              <InputDatePicker
                classNames="field-item last-field-item"
                placeholder="Availability Per (Date) To"
                rightIcon="icon-calendar-gray"
              />
            </div>

            <div className="main-box amenities mt-5">
              <span className="title d-block text-center">AMENITIES</span>
              <span className="subtitle d-block mt-2 text-center">Mark what your place offers</span>

              <hr />

              {amenities.map(({ key, label }) => (
                <Checkbox
                  key={key}
                  value={amenitiesValue[key]}
                  onChange={(value) => toggleAmenities(key, value)}
                  classNames="field-item"
                  label={label}
                />
              ))}

              {moreAmenitiesVisible && (
                <>
                  {otherAmenities.map(({ key, label }) => (
                    <Checkbox
                      key={key}
                      value={moreAmenitiesValue[key]}
                      onChange={(value) => toggleMoreAmenities(key, value)}
                      classNames="field-item"
                      label={label}
                    />
                  ))}
                </>
              )}

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
          </div>
          <div className="col-12 col-md-8 col-xl-9">
            <div className="main-box main-info mt-5 mt-md-0">
              <div className="header-icon rounded-icon not-responsive">
                <img src="/images/icon/icon-roof-primary.svg" alt="item icon" />
              </div>

              <div className="main-form">
                <div className="row">
                  {/* 1st row */}
                  <div className="col-12">
                    <Input placeholder="Property name" icon="icon-user-primary" />
                  </div>

                  {/* 2nd row */}
                  <div className="col-lg-4 mt-4">
                    <Input placeholder="Monthly Price" icon="icon-euro-primary" />
                  </div>
                  <div className="col-lg-4 mt-4">
                    <Input placeholder="Utilities Price" icon="icon-euro-primary" />
                  </div>
                  <div className="col-lg-4 mt-4">
                    <Input placeholder="Security Deposit" icon="icon-security-primary" />
                    <span className="d-block font-weight-light text-primary text-right small mt-1">
                      In your local currency
                    </span>
                  </div>

                  {/* 3rd row */}
                  <div className="col-lg-12 mt-4">
                    <Input placeholder="Address" icon="icon-map-marker-primary" />
                  </div>

                  {/* 4th row */}
                  <div className="col-lg-4 mt-4">
                    <Input
                      classNames="field-item small-icon"
                      placeholder="Country"
                      icon="icon-circle-primary"
                    />
                  </div>
                  <div className="col-lg-4 mt-4">
                    <Input
                      classNames="field-item small-icon"
                      placeholder="State"
                      icon="icon-circle-primary"
                    />
                  </div>
                  <div className="col-lg-4 mt-4">
                    <Input
                      classNames="field-item small-icon"
                      placeholder="City"
                      icon="icon-circle-primary"
                    />
                  </div>

                  {/* 5th row */}
                  <div className="col-lg-12 mt-4">
                    <Textarea icon="icon-left-align-primary" placeholder="Description" />
                  </div>
                </div>

                <div className="add-images mt-5">
                  <div className="main-box item">
                    <button
                      type="button"
                      className="button"
                      onClick={() => inputImage1.current.click()}
                    >
                      <img src="/images/icon/icon-plus-white.svg" alt="icon" />
                    </button>
                    <span className="text-center">Add Image</span>
                    <input type="file" id="inputImage1" className="d-none" ref={inputImage1} />
                  </div>

                  <div className="main-box item mt-2 mt-sm-0">
                    <button
                      type="button"
                      className="button"
                      onClick={() => inputImage2.current.click()}
                    >
                      <img src="/images/icon/icon-plus-white.svg" alt="icon" />
                    </button>
                    <span className="text-center">Add Image</span>
                    <input type="file" id="inputImage2" className="d-none" ref={inputImage2} />
                  </div>

                  <div className="main-box item mt-2 mt-sm-0">
                    <button
                      type="button"
                      className="button"
                      onClick={() => inputImage3.current.click()}
                    >
                      <img src="/images/icon/icon-plus-white.svg" alt="icon" />
                    </button>
                    <span className="text-center">Add Image</span>
                    <input type="file" id="inputImage3" className="d-none" ref={inputImage3} />
                  </div>
                </div>

                <hr className="mt-5 mb-5" />

                <div className="features">
                  <p className="main-desc font-weight-normal">
                    Sponsor your home to get better results
                  </p>
                  <ul className="mt-3">
                    <li>
                      <p className="item">To get 60% more views on your property</p>
                    </li>
                    <li>
                      <p className="item">Appear as first over other published houses</p>
                    </li>
                    <li>
                      <p className="item">
                        Appear on your homepage where your house is seen by most tenants
                      </p>
                    </li>
                    <li>
                      <p className="item">Extra budget for social media campaign</p>
                    </li>
                    <li>
                      <p className="item">For only €10 per promotion</p>
                    </li>
                  </ul>
                </div>

                <Checkbox
                  value={isSponsorChecked}
                  onChange={(value) => setIsSponsorChecked(value)}
                  labelClassNames="text-primary"
                  classNames="mt-5 justify-content-center"
                  label="I would like to sponsor my home to get better results"
                />

                <button className="button mt-5 d-block mx-auto">
                  <span className="font-weight-bold">SAVE </span>AND
                  <span className="font-weight-bold"> POST</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
