import Link from 'next/link';
import { usePropertyApplications } from 'hooks/usePropertyApplications';
import { useToasts } from 'react-toast-notifications';
import MyPropertiesApplicationsModal from 'widgets/_PageMyProperties/MyPropertiesApplicationsModal';
import { cloneDeep } from 'lodash';
import { useState } from 'react';

const NotificationItem = ({ notification }) => {
  const d = new Date(notification.createdAt);
  const datestring = `${`0${d.getDate()}`.slice(-2)}-${`0${d.getMonth() + 1}`.slice(
    -2,
  )}-${d.getFullYear()}`;

  // applications
  const { addToast } = useToasts();
  const [seeReactionModalVisible, setSeeReactionModalVisible] = useState(false);
  const [applications, setApplications] = useState([]);
  const {
    fetchApplicationsForProperties,
    status: applicationsStatus,
    errors: applicationsErrors,
  } = usePropertyApplications();

  const onViewApplications = (property) => {
    console.log(property);
    setSeeReactionModalVisible(true);

    setApplications([]);
    fetchApplicationsForProperties(
      { propertyId: property.id },
      {
        onSuccess: onFetchApplicationsSuccess,
        onError: onFetchApplicationsError,
      },
    );
  };

  const onFetchApplicationsSuccess = ({ response }) => {
    setApplications(response);
  };

  const onFetchApplicationsError = () => {
    addToast("An error occurred while fetching property's applications.", toastTypes.ERROR);
  };

  const onUpdateApplication = (index, application) => {
    setApplications((previousApplications) => {
      const newApplications = cloneDeep(previousApplications);
      newApplications[index] = application;

      return newApplications;
    });
  };
  // --------------

  return (
    <li>
      <span className="block no-underline">
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
                  {' '}
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
          <div className="ml-5 flex items-center">
            {notification.type === 'chat'
              && (
                <Link href="/messages">
                  <button type="button" className="mr-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Messages
                  </button>
                </Link>
              )}
            {notification.type === 'new_apartment_application'
              && (
                <button onClick={() => onViewApplications(notification?.data?.apartment)} type="button" className="mr-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Applications
                </button>
              )}
            <button type="button">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <MyPropertiesApplicationsModal
          applications={applications}
          status={applicationsStatus}
          errors={applicationsErrors}
          onUpdateApplication={onUpdateApplication}
          isVisible={seeReactionModalVisible}
          onClose={() => setSeeReactionModalVisible(false)}
        />
      </span>
    </li>
  );
};

export default NotificationItem;
