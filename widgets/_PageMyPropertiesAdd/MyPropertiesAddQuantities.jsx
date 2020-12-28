import FieldError from 'components/FieldError/FieldError';
import FormDatePicker from 'components/FormDatePicker/index';
import FormInputIcon from 'components/FormInputIcon/index';
import FormSelect from 'components/FormSelect/index';
import { furnishTypeOptions, houseTypeOptions } from 'shared/options';

const options = [
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
];

const MyPropertiesAddQuantities = ({ errors, touched }) => (
  <div className="main-box info-quantity">
    <div>
      <FormSelect
        classNames="field-item"
        name="houseType"
        placeholder="House Type"
        options={houseTypeOptions}
      />
      {errors.houseType && touched.houseType ? <FieldError error={errors.houseType} /> : null}
    </div>

    <div>
      <FormSelect
        classNames="field-item"
        name="bedrooms"
        placeholder="Bedrooms"
        options={options}
      />
      {errors.bedrooms && touched.bedrooms ? <FieldError error={errors.bedrooms} /> : null}
    </div>

    <div>
      <FormSelect
        classNames="field-item"
        name="bathrooms"
        placeholder="Bathrooms"
        options={options}
      />
      {errors.bathrooms && touched.bathrooms ? <FieldError error={errors.bathrooms} /> : null}
    </div>

    <div>
      <FormSelect
        classNames="field-item"
        name="furnishType"
        placeholder="Furnish Type"
        options={furnishTypeOptions}
      />
      {errors.furnishType && touched.furnishType ? <FieldError error={errors.furnishType} /> : null}
    </div>

    <div>
      <FormInputIcon type="number" classNames="field-item" name="size" placeholder="Sqft" />
      {errors.size && touched.size ? <FieldError error={errors.size} /> : null}
    </div>

    <div>
      <FormDatePicker
        classNames="field-item"
        name="availableFrom"
        placeholder="Availability Per (Date) From"
        rightIcon="icon-calendar-gray"
      />
      {errors.availableFrom && touched.availableFrom ? (
        <FieldError error={errors.availableFrom} />
      ) : null}
    </div>

    <div>
      <FormDatePicker
        classNames="field-item"
        name="availableTo"
        placeholder="Availability Per (Date) To"
        rightIcon="icon-calendar-gray"
      />
      {errors.availableTo && touched.availableTo ? <FieldError error={errors.availableTo} /> : null}
    </div>
  </div>
);

export default MyPropertiesAddQuantities;
