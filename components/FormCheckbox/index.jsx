import Checkbox from 'components/Checkbox/index';
import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';

const FormCheckbox = ({ selected,
  classNames, options, value: initialValue, label, icon, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    if (selected === true) {
      const values = field.value;
      values.push(initialValue);
      setFieldValue(field.name, values);
    }
  }, [field.value]);

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
