import cn from 'classnames';

export const stateListTypes = {
  EMPTY: 'empty',
  ERROR: 'error',
};

const emptyBoxIcon = '/images/icon/icon-empty-box.svg';
const errorBoxIcon = '/images/icon/icon-error-box.svg';

const StateList = ({ title, description, type, className }) => {
  const getIcon = () => {
    switch (type) {
      case stateListTypes.EMPTY:
        return emptyBoxIcon;

      case stateListTypes.ERROR:
        return errorBoxIcon;

      default:
        return emptyBoxIcon;
    }
  };

  return (
    <div className={cn('StateList', className)}>
      <img className="icon" src={getIcon()} alt="icon" />
      <span className="title">{title}</span>
      <span className="message">{description}</span>
    </div>
  );
};

export default StateList;
