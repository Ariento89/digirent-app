/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';

const Input = ({ value, onChange, placeholder, icon, classNames, inputClassNames }) => (
  <div className={cn('Input field-group', classNames)}>
    {icon && (
      <>
        <div className="field-icon">
          <img src={`/images/icon/${icon}.svg`} alt="icon" />
        </div>
        <span className="field-divider" />
      </>
    )}

    <input
      className={cn(inputClassNames, { 'no-icon': !icon })}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => (onChange ? onChange(e.target.value) : null)}
    />
  </div>
);

Input.defaultProps = {
  placeholder: '',
};

export default Input;
