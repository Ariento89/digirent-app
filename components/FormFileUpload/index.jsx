/* eslint-disable no-unused-vars */
import { useField, useFormikContext } from 'formik';
import React from 'react';
import cn from 'classnames';
import Button from 'components/Button/index';

const FormFileUpload = ({
  browseButtonText,
  emptySelectedText,
  uploadButtonText,
  uploadButtonType,
  loading,
  classNames,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const onChange = (event) => {
    event.preventDefault();
    event.persist();

    const file = event.target.files[0];
    setFieldValue(field.name, file);
  };

  return (
    <div className={cn('FileUpload', classNames)}>
      <div className="file-select">
        <button type="button" className="button btn-browse">
          {browseButtonText}
        </button>
        <div className="main-description font-weight-light ml-3 text-primary filename">
          {field.value?.name || emptySelectedText}
        </div>
        <input type="file" onChange={onChange} />
      </div>
      <Button type={uploadButtonType} loading={loading}>
        {uploadButtonText}
      </Button>
    </div>
  );
};

FormFileUpload.defaultProps = {
  browseButtonText: 'Browse...',
  emptySelectedText: 'No document selected',
  uploadButtonText: 'UPLOAD',
  uploadButtonType: 'submit',
};

export default FormFileUpload;
