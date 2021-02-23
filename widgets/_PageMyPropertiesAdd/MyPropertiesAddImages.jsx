import FieldError from 'components/FieldError/FieldError';
import { useEffect, useState } from 'react';
import { toBase64 } from 'shared/functions';
import AddImageField from './widgets/AddImageField';

const MyPropertiesAddImages = ({ values, errors, touched }) => {
  // STATES
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  // METHODS
  useEffect(() => {
    if (values?.image1) {
      setImageUpload(values?.image1, setImage1);
    }
    if (values?.image2) {
      setImageUpload(values?.image2, setImage2);
    }

    if (values?.image3) {
      setImageUpload(values?.image3, setImage3);
    }
  }, [values?.image1, values?.image2, values?.image3]);

  const setImageUpload = async (file, setImage) => {
    const isFile = file instanceof File;
    if (isFile) {
      const image = await toBase64(file);
      setImage(image);
    } else {
      setImage(file);
    }
  };

  return (
    <div className="add-images mt-5">
      <div className="item">
        <div className="main-box">
          <AddImageField name="image1" image={image1} />
        </div>
        {errors.image1 && touched.image1 ? <FieldError error={errors.image1} /> : null}
      </div>

      <div className="item mt-2 mt-sm-0 mx-0 mx-sm-4">
        <div className="main-box">
          <AddImageField name="image2" image={image2} />
        </div>
        {errors.image2 && touched.image2 ? <FieldError error={errors.image2} /> : null}
      </div>

      <div className="item mt-2 mt-sm-0">
        <div className="main-box">
          <AddImageField name="image3" image={image3} />
        </div>
        {errors.image3 && touched.image3 ? <FieldError error={errors.image3} /> : null}
      </div>
    </div>
  );
};

export default MyPropertiesAddImages;
