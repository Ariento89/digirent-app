import { Field } from 'formik';

const FormInputIcon = ({ name, type, placeholder, icon }) => (
  <div className="field-group ">
    <div className="field-icon">
      <img src={`/images/icon/${icon}.svg`} alt="icon" />
    </div>
    <span className="field-divider" />
    <Field type={type} name={name} placeholder={placeholder} />
  </div>
);

FormInputIcon.defaultProps = {
  type: 'text',
};

export default FormInputIcon;
