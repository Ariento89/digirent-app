import { useEffect, useRef, useState } from 'react';
import { useMe } from 'hooks/useMe';
import { useAuthentication } from 'hooks/useAuthentication';
import { API_URL_WEBSOCKET } from 'services/index';
import { eventTypes } from 'shared/types';

const ContactLandLordDialog = ({ landlord, closeDialog }) => {
  const { accessToken } = useAuthentication();
  const { me } = useMe();
  const [messageToSend, setMessageToSend] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${API_URL_WEBSOCKET}/${accessToken}`);

    return () => {
      socketRef.current.close();
    };
  }, [accessToken]);

  const sendMessage = () => {
    const data = {
      messageId: messageToSend,
      event_type: eventTypes.MESSAGE,
      data: { from: me.id, to: landlord.id, message: messageToSend },
    };
    socketRef.current.send(JSON.stringify(data));
    closeDialog();
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      ref={(el) => {
        if (el) {
          el.style.setProperty('z-index', '9999999999', 'important');
        }
      }}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Type the message you want to send
              </h3>
              <div className="mt-2">
                <div className="sm:col-span-6">

                  <div className="mt-1">
                    <textarea value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} id="about" name="about" rows="3" className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button onClick={() => sendMessage()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
              Send
            </button>
            <button onClick={() => closeDialog()} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLandLordDialog;
