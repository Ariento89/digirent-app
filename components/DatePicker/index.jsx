/* eslint-disable no-unused-vars */
import { useField, useFormikContext } from 'formik';
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
    <form className="DayPicker-Caption">
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
    </form>
  );
};

const DatePicker = ({ pickerProps, ...props }) => {
  const [month, setMonth] = useState(fromMonth);

  const handleYearMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  return (
    <div className="field-group">
      <div className="field-icon">
        <img src="/images/icon/icon-calendar-primary.svg" alt="item icon" />
      </div>
      <span className="field-divider" />
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
    </div>
  );
};

export default DatePicker;
