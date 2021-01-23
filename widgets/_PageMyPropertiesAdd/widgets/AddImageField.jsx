import { useField, useFormikContext } from 'formik';
import { useRef } from 'react';

const AddImageField = ({ image, ...props }) => {
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
      {image ? (
        <>
          <div
            className="file-image"
            alt="uploaded"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => inputRef.current.click()}
          />
        </>
      ) : (
        <>
          <button type="button" className="button" onClick={() => inputRef.current.click()}>
            <img src="/images/icon/icon-plus-white.svg" alt="icon" />
          </button>
          <span className="file-label text-center">Add Image</span>
        </>
      )}

      <input type="file" ref={inputRef} className="d-none" onChange={onChange} accept="image/*" />
    </>
  );
};

export default AddImageField;
