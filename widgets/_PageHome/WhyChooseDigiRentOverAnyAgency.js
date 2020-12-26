const WhyChooseDigiRentOverAnyAgency = () => (
  <div className="why-choose-digirent-over-any-agency container-fluid container-lg">
    <h3 className="main-title">
      WHY CHOOSE <span className="text-primary font-weight-bold">DIGI RENT</span> OVER ANY AGENCY?
    </h3>

    <div className="reasons">
      <div className="header">
        <div className="column-1" />
        <div className="column-2">
          <div className="logo">
            <h1 className="text">DIGI RENT</h1>
          </div>
        </div>
        <div className="column-3">
          <div className="agency">
            <img src="/images/icon/icon-house.svg" alt="icon" />
            <h1 className="text">
              TRADITIONAL
              <br />
              AGENCY
            </h1>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="column-1">
          <p className="main-desc font-weight-bold text-dark">COMMISSION FEE</p>
          <p className="main-desc text-dark mt-2">
            Only charged monthly when using our premium plan
          </p>
        </div>
        <div className="column-2">
          <span className="main-desc digirent-fee text-primary">
            €<span className="font-weight-bold"> 39</span>
          </span>
        </div>
        <div className="column-3">
          <span className="main-desc traditional-fee text-center">
            <span className="font-weight-bold">100</span> %
            <br />
            <span>of a month&apos;s rent</span>
          </span>
        </div>
      </div>

      <div className="item">
        <div className="column-1">
          <p className="main-desc font-weight-bold text-dark">QUALITY TENANTS</p>
          <p className="main-desc text-dark mt-2">Choose the tenant of your liking</p>
        </div>
        <div className="column-2">
          <button className="button-icon primary">
            <img src="/images/icon/icon-check-white.svg" alt="icon" />
          </button>
        </div>
        <div className="column-3">
          <button className="button-icon gray2">
            <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
          </button>
        </div>
      </div>

      <div className="item">
        <div className="column-1">
          <p className="main-desc font-weight-bold text-dark">FAST ONLINE BOOKINGS</p>
          <p className="main-desc text-dark mt-2">No need for in-person viewings</p>
        </div>
        <div className="column-2">
          <button className="button-icon primary">
            <img src="/images/icon/icon-check-white.svg" alt="icon" />
          </button>
        </div>
        <div className="column-3">
          <button className="button-icon gray2">
            <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
          </button>
        </div>
      </div>

      <div className="item">
        <div className="column-1">
          <p className="main-desc font-weight-bold text-dark">GET BOOKED</p>
          <p className="main-desc text-dark mt-2">Secure tenants months in advance</p>
        </div>
        <div className="column-2">
          <button className="button-icon primary">
            <img src="/images/icon/icon-check-white.svg" alt="icon" />
          </button>
        </div>
        <div className="column-3">
          <button className="button-icon gray2">
            <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default WhyChooseDigiRentOverAnyAgency;
