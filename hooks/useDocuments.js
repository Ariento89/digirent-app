import { actions, selectors, types } from 'ducks/documents';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useDocuments = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // SELECTORS
  const profilePhoto = useSelector(selectors.selectProfilePhoto());

  // ACTIONS
  const uploadCopyIdAction = useActionDispatch(actions.uploadCopyId);
  const uploadProofOfIncomeAction = useActionDispatch(actions.uploadProofOfIncome);
  const uploadProofOfEnrolmentAction = useActionDispatch(actions.uploadProofOfEnrolment);
  const uploadProfilePhotoAction = useActionDispatch(actions.uploadProfilePhoto);

  // GENERAL METHODS
  const resetError = () => setErrors([]);

  const resetStatus = () => setStatus(request.NONE);

  const reset = () => {
    resetError();
    resetStatus();
  };

  const requestCallback = ({ status: requestStatus, errors: requestErrors = [] }) => {
    setStatus(requestStatus);
    setErrors(requestErrors);
  };

  const executeRequest = (data, callback, action, type) => {
    setRecentRequest(type);
    action({
      ...data,
      callback: onCallback(requestCallback, callback?.onSuccess, callback?.onError),
    });
  };

  // REQUEST METHODS
  const uploadCopyId = (data, callback = {}) => {
    executeRequest(data, callback, uploadCopyIdAction, types.UPLOAD_COPY_ID);
  };

  const uploadProofOfIncome = (data, callback = {}) => {
    executeRequest(data, callback, uploadProofOfIncomeAction, types.UPLOAD_PROOF_OF_INCOME);
  };

  const uploadProofOfEnrolment = (data, callback = {}) => {
    executeRequest(data, callback, uploadProofOfEnrolmentAction, types.UPLOAD_PROOF_OF_ENROLMENT);
  };

  const uploadProfilePhoto = (data, callback = {}) => {
    executeRequest(data, callback, uploadProfilePhotoAction, types.UPLOAD_PROFILE_PHOTO);
  };

  return {
    profilePhoto,
    uploadCopyId,
    uploadProofOfIncome,
    uploadProofOfEnrolment,
    uploadProfilePhoto,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
