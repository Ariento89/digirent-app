/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';

export const ToggleSwitch = ({
  name,
  value,
  onChange,
  onValue,
  onLabel,
  offValue,
  offLabel,
  label,
  classNames,
}) => (
  <div className={cn('toggle-switch', classNames)}>
    <div className="switch">
      <input
        id={`${name}-on`}
        className="toggle toggle-left"
        name={`${name}-on`}
        value={onValue}
        type="radio"
        checked={value === onValue}
        onChange={() => (onChange ? onChange(onValue) : null)}
      />
      <label htmlFor={`${name}-on`} className="switch-button">
        {onLabel}
      </label>
      <input
        id={`${name}-off`}
        className="toggle toggle-right"
        name={`${name}-off`}
        value={offValue}
        type="radio"
        checked={value === offValue}
        onChange={() => (onChange ? onChange(offValue) : null)}
      />
      <label htmlFor={`${name}-off`} className="switch-button">
        {offLabel}
      </label>
    </div>
    {label && <span className="main-desc ml-3">{label}</span>}
  </div>
);

ToggleSwitch.defaultProps = {
  value: 'true',
  onValue: 'true',
  offValue: 'false',
  onLabel: 'ON',
  offLabel: 'OFF',
};
