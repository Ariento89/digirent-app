import * as React from 'react';
import cn from 'classnames';

const FieldError = ({ error, classNames, center }) => (
  <div className={cn('FieldError', { center }, classNames)}>
    <img className="icon" src="/images/icon/icon-field-error.svg" alt="icon" />
    <span className="text">{error}</span>
  </div>
);

export default FieldError;
