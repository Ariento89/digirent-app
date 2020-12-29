import Checkbox from 'components/Checkbox/index';
import { useField, useFormikContext } from 'formik';
import React from 'react';

const FormCheckbox = ({ classNames, options, value: initialValue, label, icon, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const handleChange = (value) => {
    const values = field.value;
    const index = values.indexOf(value);
    if (index === -1) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    setFieldValue(field.name, values);
  };

  return (
    <Checkbox
      value={field.value.includes(initialValue)}
      onChange={() => handleChange(initialValue)}
      classNames={classNames}
      label={label}
    />
  );
};

export default FormCheckbox;
