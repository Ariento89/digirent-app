import { useField, useFormikContext } from 'formik';
import { useRef } from 'react';

const AddImageField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const inputRef = useRef(null);

  const onChange = (event) => {
    event.preventDefault();
    event.persist();

    const file = event.target.files[0];
    setFieldValue(field.name, file);
  };

  return (
    <>
      <button type="button" className="button" onClick={() => inputRef.current.click()}>
        <img src="/images/icon/icon-plus-white.svg" alt="icon" />
      </button>
      <span className="text-center">Add Image</span>
      <input type="file" ref={inputRef} className="d-none" onChange={onChange} accept="image/*" />
    </>
  );
};

export default AddImageField;
