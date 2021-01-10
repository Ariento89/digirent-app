import cn from 'classnames';

const MessagesPerson = ({ name, time, count, recentMesage, className }) => (
  <div className={cn('item', className)}>
    <div className="user-photo" />
    <div className="information">
      <div className="name-date">
        <p className="name">{name}</p>
        <div className="date-wrapper">
          <p className="time">{time}</p>
          {count > 0 && <p className="messages-count">{count}</p>}
        </div>
      </div>
      <p className="message main-desc">{recentMesage}</p>
    </div>
  </div>
);

export default MessagesPerson;
