import { useEffect, useState } from 'react';

import NotificationItem from 'widgets/Notification/NotificationItem';

const NotificationSection = ({ title, notifications }) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  useEffect(() => {
    setAllNotifications(notifications);
  }, [notifications]);

  const notificationDeleted = (id) => {
    setAllNotifications(allNotifications.filter((noti) => noti.id !== id));
  };
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      {allNotifications.length === 0 && (
        <div className="m-6 max-w-xl text-sm text-gray-500">
          <p>You do not have any notifications.</p>
        </div>
      )}
      {allNotifications.length !== 0 && (
        <ul className="divide-y divide-gray-200">
          {allNotifications.map((noti) => (
            <NotificationItem onDeleted={notificationDeleted} key={noti.id} notification={noti} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationSection;
