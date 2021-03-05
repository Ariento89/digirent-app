import cn from 'classnames';
import { Field } from 'formik';

const FormInputIcon = ({ name, type, placeholder, icon, classNames }) => (
  <div className={cn('field-group', classNames)}>
    {icon && (
      <>
        <div className="field-icon">
          <img src={`/images/icon/${icon}.svg`} alt="icon" />
        </div>
        <span className="field-divider" />
      </>
    )}

    <Field className={cn({ 'no-icon': !icon })} type={type} name={name} placeholder={placeholder} min={0} step="any" />
  </div>
);

FormInputIcon.defaultProps = {
  type: 'text',
};

export default FormInputIcon;
