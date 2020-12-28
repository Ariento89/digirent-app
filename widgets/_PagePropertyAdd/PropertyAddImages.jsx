import FieldError from 'components/FieldError/FieldError';
import AddImageField from './widgets/AddImageField';

const PropertyAddImages = ({ errors, touched }) => (
  <>
    <div className="add-images mt-5">
      <div>
        <div className="main-box item">
          <AddImageField />
        </div>
        {errors.image1 && touched.image1 ? <FieldError error={errors.image1} /> : null}
      </div>

      <div className="mt-2 mt-sm-0">
        <div className="main-box item ">
          <AddImageField />
        </div>
        {errors.image2 && touched.image2 ? <FieldError error={errors.image2} /> : null}
      </div>

      <div className="mt-2 mt-sm-0">
        <div className="main-box item mt-2 mt-sm-0">
          <AddImageField />
        </div>
        {errors.image3 && touched.image3 ? <FieldError error={errors.image3} /> : null}
      </div>
    </div>
  </>
);

export default PropertyAddImages;
