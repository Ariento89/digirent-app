import cn from 'classnames';
import { useState } from 'react';
import { findOptions } from 'shared/functions';

const Select = ({ value, onChange, options, placeholder, classNames, icon }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive((isActiveValue) => !isActiveValue);

  const onBlur = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 150);
  };

  return (
    <div className={cn('field-group-select select', classNames, { active: isActive })}>
      {icon && (
        <>
          <img src={`/images/icon/${icon}.svg`} className="left-icon" alt="icon" />
          <span className="divider" />
        </>
      )}
      <span className={cn('value', { selected: value !== null })}>
        {findOptions(value, options)?.name || placeholder}
      </span>
      <button type="button" className="btn-dropdown" onClick={toggleActive} onBlur={onBlur}>
        <img src="/images/icon/icon-caret-down-white.svg" alt="item icon" />
      </button>
      <div className="choices">
        {options?.map(({ name: optionName, value: optionValue }) => (
          <div
            key={optionValue}
            className="item"
            onClick={() => {
              toggleActive();
              onChange(optionValue, optionName);
            }}
          >
            {optionName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
