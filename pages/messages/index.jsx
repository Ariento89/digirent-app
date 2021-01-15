/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthentication } from 'hooks/useAuthentication';
import { useChat } from 'hooks/useChat';
import { useMe } from 'hooks/useMe';
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { API_URL_WEBSOCKET } from 'services/index';
import { eventTypes, request, toastTypes } from 'shared/types';
import PageWrapper from 'widgets/PageWrapper';
import MessagesList from 'widgets/_PageMessages/MessagesList';
import MessagesMain from 'widgets/_PageMessages/MessagesMain';
import MessagesSearch from 'widgets/_PageMessages/widgets/MessagesSearch';

const MESSAGE_LIST_PAGE_SIZE = 8;
const CONVERATION_LIST_PAGE_SIZE = 20;

const Page = () => {
  // STATES
  const [wsStatus, setWsStatus] = useState(request.NONE);
  const [wsError, setWsError] = useState(null);
  const [wsRecentRequest, setWsRecentRequest] = useState(null);

  // STATES: MESSAGE LIST
  const [messageList, setMessageList] = useState([]);
  const [messageListPage, setMessageListPage] = useState(1);
  const [messageListEndOfList, setMessageListEndOfList] = useState(false);
  const [initialMessageListLoadingStatus, setMessageListInitialLoadingStatus] = useState(
    request.REQUESTING,
  );

  // STATES: MESSAGE MAIN
  const [talkingTo, setTalkingTo] = useState(null);
  const [conversationList, setConversationList] = useState([]);
  const [conversationListPage, setConversationListPage] = useState(1);
  const [initialConversationListLoadingStatus, setConversationListInitialLoadingStatus] = useState(
    request.NONE,
  );

  // REFS
  const socketRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { accessToken } = useAuthentication();
  const { me } = useMe();
  const { fetchUsersChatList, status: messageListStatus } = useChat();
  const { fetchChatMessages, status: conversationListStatus } = useChat();

  // METHODS
  useEffect(() => {
    if (
      ![request.SUCCESS, request.ERROR].includes(initialMessageListLoadingStatus) &&
      [request.SUCCESS, request.ERROR].includes(messageListStatus)
    ) {
      setMessageListInitialLoadingStatus(messageListStatus);

      if (messageListStatus === request.ERROR) {
        setConversationListInitialLoadingStatus(request.ERROR);
      }
    }
  }, [messageListStatus, initialMessageListLoadingStatus]);

  // METHODS: WEBSOCKET
  useEffect(() => {
    setWsRecentRequest(eventTypes.USER_CONNECTED);
    socketRef.current = new WebSocket(`${API_URL_WEBSOCKET}/${accessToken}`);
    socketRef.current.onopen = onOpen;
    socketRef.current.onmessage = onMessage;
    socketRef.current.onerror = onError;
    socketRef.current.onclose = onClose;

    return () => {
      setWsRecentRequest(eventTypes.USER_DISCONNECTED);
      socketRef.current.send({ event_type: eventTypes.USER_DISCONNECTED });
      socketRef.current.close();
    };
  }, [accessToken]);

  const onOpen = () => {
    setWsStatus(request.SUCCESS);
  };

  const onClose = (event) => {
    console.log('socket closed', event);
  };

  const onMessage = (event) => {
    console.log('onMessage', event);
    console.log('onMessage Data', JSON.parse(event.data));
  };

  const onError = (error) => {
    console.log('error', error);
    // setWsStatus(request.ERROR);
    // setWsError(error);
  };

  const onSend = (from, to, message) => {
    const data = {
      event_type: eventTypes.MESSAGE,
      data: { from, to, message },
    };

    if (socketRef.current && wsStatus === request.SUCCESS) {
      setWsRecentRequest(eventTypes.MESSAGE);
      socketRef.current.send(JSON.stringify(data));
    }
  };

  // METHODS: MESSAGE LIST
  useEffect(() => {
    onFetchMessageList();
  }, []);

  const onFetchMessageList = (onCompleteCallback = null) => {
    fetchUsersChatList(
      {
        page: messageListPage,
        page_size: MESSAGE_LIST_PAGE_SIZE,
      },
      {
        onSuccess: (response) => {
          onCompleteCallback?.();
          onFetchMessageListSuccess(response);
        },
        onError: (response) => {
          onCompleteCallback?.();
          onFetchMessageListError(response);
        },
      },
    );
  };

  const onFetchMessageListSuccess = ({ response }) => {
    setMessageListPage(response.page + 1);
    setMessageList(response.data);
    setMessageListEndOfList(!response.data.length);
  };

  const onFetchMessageListError = () => {
    addToast('An error occurred while fetching properties.', toastTypes.ERROR);
  };

  const onNextPageMessageList = (onCompleteCallback) => {
    onFetchMessageList(onCompleteCallback);
  };

  // METHODS: MESSAGE MAIN
  const onSelectConversation = (user, onCompleteCallback = null) => {
    setConversationListInitialLoadingStatus(request.REQUESTING);

    fetchChatMessages(
      {
        id: user?.id,
        page: conversationListPage,
        page_size: CONVERATION_LIST_PAGE_SIZE,
      },
      {
        onSuccess: (response) => {
          setTalkingTo(user);
          onCompleteCallback?.();
          setConversationListInitialLoadingStatus(response.status);
          onFetchConversationListSuccess(response);
        },
        onError: (response) => {
          onCompleteCallback?.();
          setConversationListInitialLoadingStatus(response.status);
          onFetchConversationListError(response);
        },
      },
    );
  };

  const onFetchConversationListSuccess = ({ response }) => {
    setConversationListPage(response.page + 1);
    setConversationList((value) => [...value, ...response.data]);
  };

  const onFetchConversationListError = () => {
    addToast('An error occurred while fetching conversation.', toastTypes.ERROR);
  };

  const onNextPageConversation = (onCompleteCallback) => {
    onSelectConversation(onCompleteCallback);
  };

  return (
    <PageWrapper title="DigiRent - Messages" pageName="messages">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
      <div className="container-fluid container-lg">
        <h3 className="main-title">MESSAGES</h3>
        <MessagesSearch />

        <div className="row mt-4">
          <MessagesList
            list={messageList}
            initialLoadingStatus={initialMessageListLoadingStatus}
            fetchStatus={messageListStatus}
            isEndOfList={messageListEndOfList}
            onNextPage={onNextPageMessageList}
            onSelectConversation={onSelectConversation}
          />
          <MessagesMain
            talkingTo={talkingTo}
            list={conversationList}
            initialLoadingStatus={initialConversationListLoadingStatus}
            fetchStatus={conversationListStatus}
            onNextPage={onNextPageConversation}
            onSend={onSend}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
