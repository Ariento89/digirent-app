import cn from 'classnames';
import Loader from 'react-loader-spinner';

const Button = ({ type, className, loading, onClick, children }) => (
  <button type={type} className={cn('button', className, { loading })} onClick={() => onClick?.()}>
    {loading ? <Loader type="Oval" color="#fff" height={16} width={16} /> : children}
  </button>
);

Button.defaultProps = {
  type: 'button',
};

export default Button;
