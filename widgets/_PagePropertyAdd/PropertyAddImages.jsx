import AddImageField from './widgets/AddImageField';

const PropertyAddImages = ({ errors, touched }) => (
  <div className="add-images mt-5">
    <div className="main-box item">
      <AddImageField />
    </div>

    <div className="main-box item mt-2 mt-sm-0">
      <AddImageField />
    </div>

    <div className="main-box item mt-2 mt-sm-0">
      <AddImageField />
    </div>
  </div>
);

export default PropertyAddImages;
