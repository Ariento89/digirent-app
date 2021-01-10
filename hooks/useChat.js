import { actions, types } from 'ducks/chat';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useChat = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // ACTIONS
  const fetchChatMessagesAction = useActionDispatch(actions.fetchChatMessages);
  const fetchChatMessagesBetweenUsersAction = useActionDispatch(
    actions.fetchChatMessagesBetweenUsers,
  );

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
  const fetchChatMessages = (data, callback = {}) => {
    executeRequest(data, callback, fetchChatMessagesAction, types.FETCH_CHAT_MESSAGES);
  };

  const fetchChatMessagesBetweenUsers = (data, callback = {}) => {
    executeRequest(
      data,
      callback,
      fetchChatMessagesBetweenUsersAction,
      types.FETCH_CHAT_MESSAGES_BETWEEN_USERS,
    );
  };

  return {
    fetchChatMessages,
    fetchChatMessagesBetweenUsers,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
