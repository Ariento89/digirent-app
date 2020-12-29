import Select from 'components/Select/index';
import { useField, useFormikContext } from 'formik';
import React from 'react';

const FormSelect = ({ classNames, options, placeholder, icon, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Select
      classNames={classNames}
      value={field.value}
      onChange={(value) => setFieldValue(field.name, value)}
      options={options}
      placeholder={placeholder}
      icon={icon}
    />
  );
};

export default FormSelect;
