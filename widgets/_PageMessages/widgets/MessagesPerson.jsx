import cn from 'classnames';
import dayjs from 'dayjs';

const MessagesPerson = ({ user, time, count, recentMesage, className }) => (
  <div className={cn('item', className)}>
    <div className="user-photo" />
    <div className="information">
      <div className="name-date">
        <p className="name">
          {user?.firstName} {user?.lastName}
        </p>
        <div className="date-wrapper">
          <p className="time">{dayjs(time).format('hh:mma')}</p>
          {count > 0 && <p className="messages-count">{count}</p>}
        </div>
      </div>
      <p className="message main-desc">{recentMesage}</p>
    </div>
  </div>
);

export default MessagesPerson;
