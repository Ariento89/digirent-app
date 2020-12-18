import cn from 'classnames';

const FileUpload = ({ browseText, emptySelectedText, uploadText, classNames }) => (
  <div className={cn('FileUpload', classNames)}>
    <div className="file-select">
      <button type="button" className="button btn-browse">
        {browseText}
      </button>
      <div className="main-description font-weight-light ml-3 text-primary filename">
        {emptySelectedText}
      </div>
      <input type="file" />
    </div>
    <button type="button" className="button">
      {uploadText}
    </button>
  </div>
);

FileUpload.defaultProps = {
  browseText: 'Browse...',
  emptySelectedText: 'No document selected',
  uploadText: 'UPLOAD',
};

export default FileUpload;
