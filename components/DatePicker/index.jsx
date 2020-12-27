/* eslint-disable no-unused-vars */
import cn from 'classnames';
import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

const MAX_AGE = 90;
const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - MAX_AGE, 0);
const toMonth = new Date(currentYear, 11);

export const YearMonthCaption = ({ date, localeUtils, onChange }) => {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

const DatePicker = ({ classNames, icon, rightIcon, pickerProps, ...props }) => {
  const [month, setMonth] = useState(toMonth);

  const handleYearMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  return (
    <div className={cn('field-group', classNames)}>
      {icon && (
        <>
          <div className="field-icon">
            <img src={`/images/icon/${icon}.svg`} alt="icon" />
          </div>
          <span className="field-divider" />
        </>
      )}
      <DayPickerInput
        {...props}
        dayPickerProps={{
          captionElement: ({ date, localeUtils }) => (
            <YearMonthCaption
              date={date}
              localeUtils={localeUtils}
              onChange={handleYearMonthChange}
            />
          ),
          month,
          fromMonth,
          toMonth,
          ...pickerProps,
        }}
        inputProps={{ readOnly: true }}
        formatDate={formatDate}
        parseDate={parseDate}
        format="YYYY-MM-DD"
      />
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
};

export default DatePicker;
