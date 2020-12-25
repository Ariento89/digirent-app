/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const InputDatePicker = ({ onDayClick, icon, rightIcon, placeholder, classNames }) => (
  <div
    className={cn('Input field-group', classNames, {
      'no-icon': !icon && !rightIcon,
      'right-icon': !!rightIcon,
    })}
  >
    {icon && (
      <>
        <div className="field-icon">
          <img src={`/images/icon/${icon}.svg`} alt="icon" />
        </div>
        <span className="field-divider" />
      </>
    )}

    <DayPickerInput placeholder={placeholder} onDayChange={onDayClick} />

    {rightIcon && (
      <>
        <div className="field-icon right-icon">
          <img src={`/images/icon/${rightIcon}.svg`} alt="icon" />
        </div>
        <span className="field-divider" />
      </>
    )}
  </div>
);

InputDatePicker.defaultProps = {
  placeholder: '',
};

export default InputDatePicker;
