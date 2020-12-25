import { Field } from 'formik';

const FormTextarea = ({ name, placeholder, icon }) => (
  <div className="field-group">
    <div className="field-icon">
      <img src={`/images/icon/${icon}.svg`} alt="icon" />
    </div>
    <span className="field-divider long" />
    <Field as="textarea" name={name} placeholder={placeholder} />
  </div>
);

export default FormTextarea;
