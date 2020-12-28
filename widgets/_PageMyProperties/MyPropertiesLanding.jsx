const MyPropertiesLanding = ({ onAddProperty }) => (
  <div className="landing">
    <div className="content">
      <div className="left">
        <div className="title">LET&apos;S START!</div>
        <div className="subtitle">
          <span className="add-text">ADD</span>
          <span>
            YOUR PROPERTIES AND ATTRACT
            <br /> QUALITY TENANTS
          </span>
        </div>
      </div>

      <div className="right">
        <div className="outer-circle">
          <div className="inner-circle">
            <button type="button" className="button" onClick={onAddProperty}>
              <img src="/images/icon/icon-plus-white.svg" alt="icon" />
            </button>
            <span className="mt-2 mt-md-3">Add Property</span>
          </div>
        </div>
      </div>
    </div>

    <div className="scroll-down">
      <div className="white-space" />
      <div className="scroll-down-wrapper">
        <img src="/images/scroll-down-space.svg" className="scroll-down-space" alt="icon space" />
        <img src="/images/icon/icon-caret-down-white.svg" className="scroll-down" alt="icon" />
      </div>
      <div className="white-space" />
    </div>
  </div>
);

export default MyPropertiesLanding;
