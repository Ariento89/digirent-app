const NotificationItem = ({ notification }) => {
  console.log(notification);
  const d = new Date(notification.createdAt);
  const datestring = `${`0${d.getDate()}`.slice(-2)}-${`0${d.getMonth() + 1}`.slice(
    -2,
  )}-${d.getFullYear()}`;
  return (
    <li>
      <a href="#" className="block hover:bg-gray-50 no-underline">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate">
              {notification.type === 'chat' && (
                <div className="flex text-sm">
                  <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                    You recived a new message from
                  </p>
                  &nbsp;
                  <p className="font-bold text-blue-500">
                    {notification.data?.from?.firstName} {notification.data?.from?.lastName}
                  </p>
                </div>
              )}

              {notification.type === 'new_apartment_application' && (
                <div className="flex text-sm">
                  <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                    You recived a new apartment application from
                  </p>
                  &nbsp;
                  <p className="font-bold text-blue-500">
                    {notification.data?.from?.firstName} {notification.data?.from?.lastName}
                  </p>
                </div>
              )}

              {notification.type === 'considered_apartment_application' && (
                <div className="flex text-sm">
                  <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                    Your apartment application is being considered
                  </p>
                  &nbsp;
                  <p className="font-bold text-blue-500">
                    {notification.data?.apartment?.description?.substring(0, 50)}...
                  </p>
                </div>
              )}

              {notification.type === 'rejected_apartment_application' && (
                <div className="flex text-sm">
                  <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                    Your apartment application has been rejected
                  </p>
                  &nbsp;
                  <p className="font-bold text-blue-500">
                    {notification.data?.apartment?.description?.substring(0, 50)}...
                  </p>
                </div>
              )}

              <div className="mt-2 flex">
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>
                    <time>{datestring}</time>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
};

export default NotificationItem;
