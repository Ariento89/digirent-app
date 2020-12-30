const PropertiesDetailsName = ({ property }) => (
  <div className="property-name">
    <span className="apartment-text">APARTMENT</span>
    <p className="name">{property?.name}</p>
    <div className="d-flex align-items-center">
      <img src="/images/icon/icon-map-marker-primary.svg" height="20" width="20" alt="icon" />
      <p className="ml-2 main-desc">{property?.address}</p>
    </div>

    <button className="btn-open-map">
      <a href="https://goo.gl/maps/8v5n9qm6QhgUoDCPA" target="_blank" rel="noreferrer">
        <img src="/images/icon/icon-open-map-primary.svg" height="30" width="30" alt="icon" />
        <span>OPEN MAP</span>
      </a>
    </button>
  </div>
);

export default PropertiesDetailsName;
