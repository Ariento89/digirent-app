import { useState } from 'react';
// import { useMe } from 'hooks/useMe';
// import { useAuthentication } from 'hooks/useAuthentication';
import { moveInScenarioTypes } from 'shared/types';
import cn from 'classnames';
import axios from 'axios';

const ContactLandLordDialog = ({ startContract, closeDialog }) => {
  const [selectedScenario, setSelectedScenario] = useState(moveInScenarioTypes.NO_NEED);

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
            <div className="mt-1 text-center sm:mt-3 layout-content contracts-landlord" style={{ paddingBottom: '0', paddingTop: '0' }}>
              <div className="containerZ">
                <p className="main-title-2 pt-2 mt-1">
                  MOVE IN <span className="font-weight-bold text-primary">PROCESS</span>
                </p>
                <p className="main-desc font-weight-bold text-dark-gray text-center mt-4">
                  SELECT THE MOVE IN SCENARIO
                </p>
                <p className="main-desc text-center">
                  Move in your tenant to the property and start collecting rent
                </p>

                <div className="row process-list" style={{ marginTop: '0' }}>
                  <div className="col-12 col-md-6 d-flex">
                    <div
                      className={cn('main-box item', {
                        active: selectedScenario === moveInScenarioTypes.SEND,
                      })}
                      onClick={() => setSelectedScenario(moveInScenarioTypes.SEND)}
                    >
                      <div className="selector">
                        <img src="/images/icon/icon-check-white.svg" alt="icon" />
                      </div>
                      <div className="rounded-icon primary mx-auto">
                        <img src="/images/icon/icon-send-to-sign-agreement-white.svg" alt="item icon" />
                      </div>
                      <p className="main-desc text-center font-weight-bold text-dark">
                        Send to sign agreement
                      </p>
                      <p className="main-desc text-center mt-3">
                        Build the lease agreements with available
                        templates or add your own template,
                        customize, and have tenants sign it online.
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex">
                    <div
                      className={cn('main-box item', {
                        active: selectedScenario === moveInScenarioTypes.NO_NEED,
                      })}
                      onClick={() => setSelectedScenario(moveInScenarioTypes.NO_NEED)}
                    >
                      <div className="selector">
                        <img src="/images/icon/icon-check-white.svg" alt="icon" />
                      </div>
                      <div className="rounded-icon primary mx-auto">
                        <img src="/images/icon/icon-no-need-for-an-aggrement-white.svg" alt="item icon" />
                      </div>
                      <p className="main-desc text-center font-weight-bold text-dark">
                        No need for an agreement
                      </p>
                      <p className="main-desc text-center mt-3">
                        I got this all arranged externally. And not in need of documenting here.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button onClick={() => startContract(selectedScenario === moveInScenarioTypes.SEND)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
              Start
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
//   const { accessToken } = useAuthentication();
//   const { me } = useMe();

export default ContactLandLordDialog;
