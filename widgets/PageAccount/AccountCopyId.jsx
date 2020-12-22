import FileUpload from '@blaze-react/file-upload/src/FileInputs/index';

const AccountCopyId = () => (
  <div className="main-box mt-4">
    <div className="d-flex align-items-center">
      <h3 className="main-box-title">Copy ID</h3>
      <span className="circular-icon x ml-3">
        <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
      </span>

      <span className="circular-icon check ml-1">
        <img src="/images/icon/icon-check-white.svg" alt="icon" />
      </span>
    </div>

    <FileUpload
      handleDrop={({ event, base64, files, canceled }) => {
        console.log('event', event);
        console.log('base64', base64);
        console.log('files', files);
        console.log('canceled', canceled);
      }}
    />

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

export default AccountCopyId;
