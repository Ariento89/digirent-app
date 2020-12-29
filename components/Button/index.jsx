import cn from 'classnames';
import Loader from 'react-loader-spinner';

const Button = ({ type, className, loading, children }) => (
  <button type={type} className={cn('button', className, { loading })}>
    {loading ? <Loader type="Oval" color="#fff" height={20} width={20} /> : children}
  </button>
);

Button.defaultProps = {
  type: 'button',
};

export default Button;
