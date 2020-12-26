import { Field } from 'formik';

const AuthField = ({ id, type, placeholder, disabled }) => (
  <Field
    className="AuthField"
    type={type}
    id={id}
    name={id}
    placeholder={placeholder}
    disabled={disabled}
  />
);

AuthField.defaultProps = {
  disabled: false,
};

export default AuthField;
