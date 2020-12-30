const PropertiesDetailsAmenities = ({ apartment }) => (
  <div className="property-amenities">
    <p className="main-desc text-primary">AMENITIES</p>
    <div className="divider" />
    {apartment?.amenityTitles?.length ? (
      <div className="list">
        {apartment?.amenityTitles.map((amenity) => (
          <span className="item main-desc dark-gray2">
            {amenity} <span className="icon" />
          </span>
        ))}
      </div>
    ) : (
      <span className="main-desc dark-gray2">—</span>
    )}
  </div>
);

export default PropertiesDetailsAmenities;
