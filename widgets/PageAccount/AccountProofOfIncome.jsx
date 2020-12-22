const AccountProofOfIncome = () => (
  <div className="main-box mt-4">
    <div className="d-flex align-items-center">
      <h3 className="main-box-title">Proof of Income</h3>
      <span className="circular-icon x ml-3">
        <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
      </span>

      <span className="circular-icon check ml-1">
        <img src="/images/icon/icon-check-white.svg" alt="icon" />
      </span>
    </div>

    <div className="file-upload mt-4">
      <div className="file-select">
        <button type="button" className="button btn-browse" id="fileName">
          Browse...
        </button>
        <div className="main-description font-weight-light ml-3 text-primary filename">
          No document selected
        </div>
        <input type="file" />
      </div>
      <button type="button" className="button">
        UPLOAD
      </button>
    </div>
  </div>
);

export default AccountProofOfIncome;
