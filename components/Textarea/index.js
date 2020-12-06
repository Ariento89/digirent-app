import cn from 'classnames';

const Textarea = ({ value, onChange, placeholder, icon, classNames, inputClassNames }) => (
  <div className={cn('Input field-group', classNames)}>
    {icon && (
      <>
        <div className="field-icon">
          <img src={`/images/icon/${icon}.svg`} alt="icon" />
        </div>
        <span className="field-divider" />
      </>
    )}

    <textarea
      className={cn(inputClassNames, { 'no-icon': !icon })}
      placeholder={placeholder}
      onChange={(e) => (onChange ? onChange(e.target.value) : null)}
    >
      {value}
    </textarea>
  </div>
);

Textarea.defaultProps = {
  placeholder: '',
  value: null,
};

export default Textarea;
