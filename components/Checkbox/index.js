import cn from 'classnames';

const Checkbox = ({ value, onChange, label, classNames, labelClassNames }) => (
  <div className={cn('Checkbox', classNames)}>
    <span
      className={cn('rounded-icon checkbox', { active: value })}
      onClick={() => onChange(!value)}
    >
      <img src="/images/icon/icon-check-primary.svg" alt="icon" />
    </span>
    <span className={cn('ml-3 label', labelClassNames)} onClick={() => onChange(!value)}>
      {label}
    </span>
  </div>
);

export default Checkbox;
