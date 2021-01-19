import { Field } from 'formik';

const AuthFieldDatePicker = ({ name, options, placeholder, onChange }) => (
  <Field
    className="AuthField"
    as="select"
    name={name}
    placeholder={placeholder}
    onChange={onChange}
  >
    <option value="" disabled hidden>
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Field>
);

export default AuthFieldDatePicker;
