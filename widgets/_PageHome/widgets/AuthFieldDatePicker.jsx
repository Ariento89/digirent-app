/* eslint-disable no-unused-vars */
import { useField, useFormikContext } from 'formik';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

const AuthFieldDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DayPickerInput
      {...field}
      {...props}
      inputProps={{ readOnly: true }}
      className="AuthFieldDatePicker"
      formatDate={formatDate}
      parseDate={parseDate}
      format="YYYY-MM-DD"
      selectedDay={(field.value && new Date(field.value)) || null}
      onDayChange={(selectedDay, _modifiers, _dayPickerInput) => {
        setFieldValue(field.name, selectedDay);
      }}
    />
  );
};

export default AuthFieldDatePicker;
