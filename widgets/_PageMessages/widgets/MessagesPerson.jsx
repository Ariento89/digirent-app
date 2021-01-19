import cn from 'classnames';
import dayjs from 'dayjs';
import { getProfileImage } from 'shared/functions';

const MessagesPerson = ({ isActive, user, time, count, recentMesage, className }) => (
  <div className={cn('item', { active: isActive }, className)}>
    <div
      className="user-photo"
      style={{ backgroundImage: getProfileImage(user?.profileImageUrl) }}
    />
    <div className="information">
      <div className="name-date">
        <p className="name">
          {user?.firstName} {user?.lastName}
        </p>
        <div className="date-wrapper">
          <p className="time">{dayjs(time).format('hh:mma')}</p>
          {!!count && <p className="messages-count">{count}</p>}
        </div>
      </div>
      <p className="message main-desc">{recentMesage}</p>
    </div>
  </div>
);

export default MessagesPerson;
