import NotificationItem from 'widgets/Notification/NotificationItem';

const NotificationSection = ({ title, notifications }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 className="text-xl leading-6 font-medium text-gray-900">{title}</h3>
    </div>
    {notifications.length === 0 && (
      <div className="m-6 max-w-xl text-sm text-gray-500">
        <p>You do not have any notifications.</p>
      </div>
    )}
    {notifications.length !== 0 && (
      <ul className="divide-y divide-gray-200">
        {notifications.map((noti) => (
          <NotificationItem key={noti.id} notification={noti} />
        ))}
      </ul>
    )}
  </div>
);

export default NotificationSection;
