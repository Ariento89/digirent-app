import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationSection from 'widgets/Notification/NotificationSection';
import PageWrapper from 'widgets/PageWrapper';

const Page = () => {
  const [notifications, setNotifications] = useState([]);

  const todayDate = new Date().toISOString().split('T')[0];

  const todaysNotifications = notifications.filter((noti) => noti.createdAt.includes(todayDate));
  const earilersNotifications = notifications.filter((noti) => !noti.createdAt.includes(todayDate));

  const fetchNotificactions = async () => {
    const result = await axios('/notifications?page=1&page_size=100');
    setNotifications(result.data.data);
  };
  useEffect(() => {
    fetchNotificactions();
  }, []);

  return (
    <PageWrapper title="DigiRent - Notifications" pageName="Notifications">
      <div className="bg-gray-100 px-8 py-8 ">
        <div className="container-fluid container-lg">
          <div>
            <NotificationSection title="Today" notifications={todaysNotifications} />
          </div>

          <div className="mt-6">
            <NotificationSection title="Earlier" notifications={earilersNotifications} />
          </div>

          <div className="h-16" />
          <div className="h-16" />
          <div className="h-16" />
          <div className="h-16" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
