import { API_ASSET_URL } from 'services/index';

const PropertiesDetailsLandlord = ({ landlord }) => (
  <div className="main-box landlord-details">
    <div className="landlord-photo">
      <div className="photo" style={{ backgroundImage: `url(${API_ASSET_URL}${landlord.profileImageUrl})` }} />
    </div>

    <div className="d-flex align-items-center justify-content-center">
      <img
        src="/images/icon/icon-star-filled-yellow.svg"
        height="25"
        width="25"
        className="mr-2"
        alt=""
      />
      <p className="main-desc text-primary mt-2">EXCELLENT LANDLORD</p>
    </div>

    <div className="landlord-name mt-3 mt-xl-4">
      <p className="name text-center">{`${landlord.firstName} ${landlord.lastName}`}</p>
      <p className="main-desc dark-gray2 text-center">Speaks Dutch, English</p>
    </div>

    <div className="landlord-response mt-3">
      <div className="d-flex align-items-center">
        <p className="main-desc dark-gray2 mr-1">RESPONSE RATE </p>
        <p className="main-desc text-primary">100%</p>
      </div>

      <div className="divider" />

      <div className="d-flex align-items-center">
        <p className="main-desc dark-gray2 mr-1">RESPONSE TIME </p>
        <p className="main-desc text-primary">2 HOURS</p>
      </div>
    </div>

    <div className="d-flex align-items-center justify-content-center mt-4">
      <img src="/images/icon/icon-checked.svg" height="20" width="20" className="mr-2" alt="" />
      <p className="main-desc dark-gray2">
        <span className="font-weight-bold text-primary">50 </span>SUCCESSFUL BOOKINGS
      </p>
    </div>

    <button className="button min-width mt-4 d-block mx-auto">CONTACT</button>
  </div>
);

export default PropertiesDetailsLandlord;
