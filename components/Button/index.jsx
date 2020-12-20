import cn from 'classnames';
import Loader from 'react-loader-spinner';

const Button = ({ className, loading, children }) => (
  <button className={cn('button', className, { loading })}>
    {loading ? <Loader type="Oval" color="#fff" height={20} width={20} /> : children}
  </button>
);

export default Button;
