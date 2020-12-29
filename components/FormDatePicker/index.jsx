/* eslint-disable no-unused-vars */
import DatePicker from 'components/DatePicker/index';
import { useField, useFormikContext } from 'formik';
import React from 'react';

const FormDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      selectedDay={(field.value && new Date(field.value)) || null}
      onDayChange={(selectedDay, _, __) => {
        setFieldValue(field.name, selectedDay);
      }}
    />
  );
};

export default FormDatePicker;
