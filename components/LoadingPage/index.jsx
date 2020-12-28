import Loader from 'react-loader-spinner';

const LoadingPage = () => (
  <div className="LoadingPage">
    <Loader type="Oval" color="#41a2f9" height={50} width={50} />
    <span className="loading-text">Please wait a moment...</span>
  </div>
);

export default LoadingPage;
