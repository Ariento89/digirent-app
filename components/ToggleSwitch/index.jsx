/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { useState } from 'react';

const ToggleSwitch = ({
  name,
  value,
  onChange,
  onValue,
  onLabel,
  offValue,
  offLabel,
  label,
  classNames,
}) => {
  const [finished, isFinished] = useState(false)

  setTimeout(() => {
    isFinished(true)
  }, 1000);

  return !finished ? null : (<>
    <script>{
    Weglot.initialize({
      api_key: 'wg_ac3c0caf29a30b300b45bc7ba773a64e0'
    })
  }</script>
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
    onClick={() => Weglot?.switchTo('en')}
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
    onClick={() => Weglot?.switchTo('nl')}
  />
  <label htmlFor={`${name}-off`} className="switch-button">
    {offLabel}
  </label>
</div>
{label && <span className="main-desc ml-3">{label}</span>}
</div>
</>)
};

ToggleSwitch.defaultProps = {
  value: 'true',
  onValue: 'true',
  offValue: 'false',
  onLabel: 'ON',
  offLabel: 'OFF',
};

export default ToggleSwitch;
