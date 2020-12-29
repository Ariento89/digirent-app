import Loader from 'react-loader-spinner';

const Spinner = ({ isLoading, loadingText, children }) => (
  <div className="SpinnerWrapper">
    {isLoading && (
      <div className="Spinner">
        <Loader type="Oval" color="#41a2f9" height={50} width={50} />
        <span className="loading-text">{loadingText}</span>
      </div>
    )}

    {children}
  </div>
);

Spinner.defaultProps = {
  isLoading: false,
  loadingText: '',
};

export default Spinner;
