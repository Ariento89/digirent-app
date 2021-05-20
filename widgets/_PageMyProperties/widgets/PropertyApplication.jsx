/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import cn from 'classnames';
import Button from 'components/Button/index';
import { types } from 'ducks/propertyApplications';
import { usePropertyApplications } from 'hooks/usePropertyApplications';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { showErrorsMessage } from 'shared/functions';
import { applicationStatusTypes, request, toastTypes } from 'shared/types';
import { API_ASSET_URL } from 'services/index';
import ContactLandLordDialog from 'widgets/ContactLandLordDialog';
import StartContracctDialog from '../StartContractDialog';

const PropertyApplication = ({ application: propertyApplication, onUpdateApplication }) => {
  // STATES
  const [application, setApplication] = useState(null);
  const [buttonOverlayVisible, setButtonOverlayVisible] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openStartContract, setOpenStartContract] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const {
    processApplication,
    considerApplication,
    rejectApplication,
    status,
    errors,
    recentRequest,
  } = usePropertyApplications();

  // METHODS
  useEffect(() => {
    setApplication(propertyApplication);
  }, [propertyApplication]);

  const onProcess = (withContract) => {
    processApplication(
      { applicationId: application.id, withContract },
      {
        onSuccess: ({ response }) => {
          setApplication(response);
          onUpdateApplication(response);
          addToast("Successfully processed the tenant's property application.", toastTypes.SUCCESS);
          setOpenStartContract(false);
        },
        onError: () => {
          showErrorsMessage(addToast, errors);
          addToast(
            "An error occurred while processing the tenant's property application.",
            toastTypes.ERROR,
          );
        },
      },
    );
  };

  const onReject = () => {
    rejectApplication(
      { applicationId: application.id },
      {
        onSuccess: ({ response }) => {
          setApplication(response);
          onUpdateApplication(response);
          addToast("Succesfully rejected the tenant's property application.", toastTypes.SUCCESS);
        },
        onError: () => {
          showErrorsMessage(addToast, errors);
          addToast(
            "An error occurred while rejecting the tenant's property application.",
            toastTypes.ERROR,
          );
        },
      },
    );
  };

  const onConsider = () => {
    considerApplication(
      { applicationId: application.id },
      {
        onSuccess: ({ response }) => {
          setApplication(response);
          onUpdateApplication(response);
          addToast("Successfully reserved the tenant's property application.", toastTypes.SUCCESS);
        },
        onError: () => {
          showErrorsMessage(addToast, errors);
          addToast(
            "An error occurred while reserving the tenant's property application.",
            toastTypes.ERROR,
          );
        },
      },
    );
  };

  return (
    <div className="PropertyApplication">
      {openContact && (
        <ContactLandLordDialog
          landlord={application?.tenant}
          closeDialog={() => {
            setOpenContact(false);
          }}
        />
      )}
      {openStartContract && (
        <StartContracctDialog
          startContract={(withContract) => {
            onProcess(withContract);
          }}
          closeDialog={() => {
            setOpenStartContract(false);
          }}
        />
      )}

      <div className="item d-none d-md-flex">
        <div className="user-photo" style={{ backgroundImage: `url(${API_ASSET_URL}${application?.tenant?.profileImageUrl})` }} />

        <div className="user-name flex-1 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <span className="text-sm font-weight-bold">{application?.tenant?.firstName}</span>
            <span className="text-sm">, {application?.tenant?.age}</span>
            <img
              className="ml-2"
              src="/images/icon/icon-gender-primary.svg"
              height="15"
              width="15"
              alt="icon"
            />
          </div>
          <p className="d-block text-sm text-primary m-0">STUDENT</p>
        </div>

        <div className="divider" />

        <div className="flex-1">
          <span className="profile-completion text-sm">
            <span className="font-weight-bold d-block">{application?.tenant?.profilePercentage}% PROFILE</span>
            COMPLETION
          </span>
        </div>

        <div className="divider" />

        <div className="flex-1">
          <span className="verified text-sm">{application?.status?.toUpperCase()}</span>
        </div>

        <div className="divider" />

        <div
          className="flex-1 buttons"
          onMouseOver={() => setButtonOverlayVisible(true)}
          onMouseOut={() => setButtonOverlayVisible(false)}
        >
          {application?.status === applicationStatusTypes.NEW && (
            <>
              {buttonOverlayVisible && (
                <div className="button-overlay">
                  <div className="item">
                    <span className="circular-icon gray mr-2" />
                    <span className="text">REJECTED</span>
                  </div>
                  <div className="item">
                    <span className="circular-icon yellow mr-2" />
                    <span className="text">SELECTED AS RESERVE</span>
                  </div>
                </div>
              )}

              <Button
                className="btn-icon btn-x gray2"
                onClick={onReject}
                loading={
                  recentRequest === types.REJECT_APPLICATION && status === request.REQUESTING
                }
                disabled={status === request.REQUESTING}
              >
                <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
              </Button>

              <Button
                className="yellow btn-icon btn-circle mx-2"
                onClick={onConsider}
                loading={
                  recentRequest === types.CONSIDER_APPLICATION && status === request.REQUESTING
                }
                disabled={status === request.REQUESTING}
              >
                <div className="circle-icon" />
              </Button>
            </>
          )}

          {application?.status === applicationStatusTypes.CONSIDERED && (
            <>
              <button onClick={() => { setOpenStartContract(true); }} type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Accept
              </button>
            </>
          )}

          {/* {application?.status === applicationStatusTypes.PROCESSING && (
            <>
              {buttonOverlayVisible && (
                <div className="button-overlay">
                  <div className="item">
                    <span className="circular-icon gray mr-2" />
                    <span className="text">REJECTED</span>
                  </div>
                  <div className="item">
                    <span className="circular-icon green mr-2" />
                    <span className="text">SELECTED TO BE PICKED</span>
                  </div>
                </div>
              )}

              <Button
                className="btn-icon btn-x gray2"
                onClick={onReject}
                loading={
                  recentRequest === types.REJECT_APPLICATION && status === request.REQUESTING
                }
                disabled={status === request.REQUESTING}
              >
                <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
              </Button>

              <Button
                className="green btn-icon btn-check"
                onClick={onProcess}
                loading={
                  recentRequest === types.PROCESS_APPLICATION && status === request.REQUESTING
                }
                disabled={status === request.REQUESTING}
              >
                <img src="/images/icon/icon-check-white.svg" alt="icon" />
              </Button>
            </>
          )} */}

          {[
            // applicationStatusTypes.CONSIDERED,
            applicationStatusTypes.FAILED,
            applicationStatusTypes.REJECTED,
            applicationStatusTypes.AWARDED,
            applicationStatusTypes.COMPLETED,
            applicationStatusTypes.PROCESSING,
          ].includes(application?.status) && (
            <span className={cn('application-status text-sm', application?.status)}>
              {application?.status}
            </span>
          )}
        </div>

        <div className="divider" />

        <div className="flex-1">
          <button onClick={() => { setOpenContact(true); }} type="button" className="button btn-email d-block mx-auto">
            <img src="/images/icon/icon-email-outline.svg" alt="icon" />
          </button>
        </div>
      </div>

      <div className="item mobile d-block d-md-none">
        <div className="user-name text-center">
          <div className="d-flex align-items-center justify-content-center">
            <span className="text-sm font-weight-bold">Jane</span>
            <span className="text-sm">, 22</span>
            <img
              className="ml-2"
              src="/images/icon/icon-gender-primary.svg"
              height="15"
              width="15"
              alt="icon"
            />
          </div>
          <p className="d-block text-sm text-primary m-0">STUDENT</p>
        </div>

        <div className="second-row mt-2">
          <span className="profile-completion text-sm">
            <span className="font-weight-bold d-block">60% PROFILE</span>
            COMPLETION
          </span>

          <span className="verified ml-2">VERIFIED</span>
        </div>

        <div
          className="buttons mt-2"
          onMouseOver={() => setButtonOverlayVisible(true)}
          onMouseOut={() => setButtonOverlayVisible(false)}
        >
          {buttonOverlayVisible && (
            <div className="button-overlay">
              <div className="item">
                <span className="circular-icon green mr-2" />
                <span className="text">SELECTED TO BE PICKED</span>
              </div>
              <div className="item">
                <span className="circular-icon gray mr-2" />
                <span className="text">REJECTED</span>
              </div>
              <div className="item">
                <span className="circular-icon yellow mr-2" />
                <span className="text">SELECTED AS RESERVE</span>
              </div>
            </div>
          )}

          <button type="button" className="button btn-icon btn-x gray2">
            <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
          </button>
          <button type="button" className="button yellow btn-icon btn-circle mx-1">
            <div className="circle-icon" />
          </button>
          <button type="button" className="button green btn-icon btn-check mr-1">
            <img src="/images/icon/icon-check-white.svg" alt="icon" />
          </button>
          <button type="button" className="button btn-email">
            <img src="/images/icon/icon-email-outline.svg" alt="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyApplication;
