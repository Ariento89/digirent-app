const PropertiesDetailsAmenities = ({ property }) => (
  <div className="">
    <p className="main-desc main-desc-header text-primary">AMENITIES</p>
    <div className="divider" />
    {property?.amenityTitles?.length ? (
      <div className="row">
        {property?.amenityTitles.map((amenity) => (
          <div className="col-3">
            <span className="item">
              {amenity} <span className="icon" />
            </span>
          </div>
        ))}
      </div>
    ) : (
      <span className="main-desc dark-gray2">—</span>
    )}
  </div>
);

export default PropertiesDetailsAmenities;
