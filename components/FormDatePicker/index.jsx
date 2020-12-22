/* eslint-disable no-unused-vars */
import { useField, useFormikContext } from 'formik';
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

const FormDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <div className="field-group">
      <div className="field-icon">
        <img src="/images/icon/icon-calendar-primary.svg" alt="item icon" />
      </div>
      <span className="field-divider" />
      <DayPickerInput
        {...field}
        {...props}
        inputProps={{ readOnly: true }}
        formatDate={formatDate}
        parseDate={parseDate}
        format="YYYY-MM-DD"
        selectedDay={(field.value && new Date(field.value)) || null}
        onDayChange={(selectedDay, _modifiers, _dayPickerInput) => {
          setFieldValue(field.name, selectedDay);
        }}
      />
    </div>
  );
};

export default FormDatePicker;
