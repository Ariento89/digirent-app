import { useAuthentication } from 'hooks/useAuthentication';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { API_URL_WEBSOCKET } from 'services/index';

const NotificationBadge = () => {
  const [notificationsCount, setNotificationsCount] = useState(0);
  const { accessToken } = useAuthentication();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${API_URL_WEBSOCKET}/${accessToken}`);
    socketRef.current.onmessage = onMessage;

    return () => {
      socketRef.current.close();
    };
  }, [accessToken]);

  const onMessage = (event) => {
    // const { data, eventType } = JSON.parse(event.data);
    console.log('onMessage', JSON.parse(event.data));
  };

  return (
    <Link href="/notifications">
      <a className="text-white inline-block relative">
        {notificationsCount > 0 && <span className="absolute top-2 right-1 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-red-400" />}
        <svg
          className="px-2 h-10 w-10 text-white inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </a>
    </Link>
  );
};

export default NotificationBadge;
