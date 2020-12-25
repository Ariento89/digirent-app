import cn from 'classnames';

const Badge = ({ label, classNames }) => (
  <div className={cn('Badge', classNames)}>
    <div className="icon-circle" />
    <span className="main-desc dark-gray2">{label}</span>
  </div>
);

export default Badge;
