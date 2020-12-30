const PropertiesDetailsDescription = ({ property }) => (
  <div className="main-box house-long-description">
    <p className="main-desc font-weight-bold text-primary">DESCRIPTION</p>
    <hr className="my-4" />
    <p className="main-desc dark-gray2">{property?.description}</p>
  </div>
);

export default PropertiesDetailsDescription;
