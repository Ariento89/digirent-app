/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthentication } from 'hooks/useAuthentication';
import { useChat } from 'hooks/useChat';
import { useMe } from 'hooks/useMe';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
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
  const [isDirectMessageDone, setIsDirectMessageDone] = useState(false);

  // STATES: MESSAGE LIST
  const [messageList, setMessageList] = useState([]);
  const [messageListPage, setMessageListPage] = useState(1);
  const [messageListEndOfList, setMessageListEndOfList] = useState(false);
  const [messageListInitialStatus, setMessageListInitialStatus] = useState(request.REQUESTING);

  // STATES: MESSAGE MAIN
  const [talkingTo, setTalkingTo] = useState(null);
  const [conversationList, setConversationList] = useState([]);
  const [conversationListPage, setConversationListPage] = useState(1);
  const [conversationListEndOfList, setConversationListEndOfList] = useState(false);
  const [conversationListInitialStatus, setConversationListInitialStatus] = useState(request.NONE);

  // REFS
  const socketRef = useRef(null);

  // CUSTOM HOOKS
  const router = useRouter();
  const { addToast } = useToasts();
  const { accessToken } = useAuthentication();
  const { me } = useMe();
  const { fetchUsersChatList, status: messageListStatus } = useChat();
  const { fetchChatMessages, status: conversationListStatus } = useChat();

  // METHODS
  useEffect(() => {
    if (
      ![request.SUCCESS, request.ERROR].includes(messageListInitialStatus) &&
      [request.SUCCESS, request.ERROR].includes(messageListStatus)
    ) {
      setMessageListInitialStatus(messageListStatus);

      if (messageListStatus === request.ERROR) {
        setConversationListInitialStatus(request.ERROR);
      }
    }
  }, [messageListStatus, messageListInitialStatus]);

  useEffect(() => {
    const { isDirect = false, userId, firstName, lastName, profileImageUrl, role } = router.query;
    if (
      isDirect &&
      !isDirectMessageDone &&
      messageList.length &&
      messageListInitialStatus === request.SUCCESS
    ) {
      onSelectConversation({ id: userId, firstName, lastName, profileImageUrl, role }, true);
      setIsDirectMessageDone(true);
    }
  }, [router, messageList, messageListInitialStatus]);

  // METHODS: WEBSOCKET
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.onmessage = onMessage;
    }
  }, [talkingTo, socketRef]);

  useEffect(() => {
    setWsRecentRequest(eventTypes.USER_CONNECTED);
    socketRef.current = new WebSocket(`${API_URL_WEBSOCKET}/${accessToken}`);
    socketRef.current.onopen = onOpen;
    socketRef.current.onmessage = onMessage;
    socketRef.current.onerror = onError;
    socketRef.current.onclose = onClose;

    return () => {
      setWsRecentRequest(eventTypes.USER_DISCONNECTED);
      // socketRef.current.send({ event_type: eventTypes.USER_DISCONNECTED });
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
    const { data, eventType } = JSON.parse(event.data);
    console.log('onMessage', JSON.parse(event.data));
    if (eventType === eventTypes.MESSAGE) {
      if (data.from === talkingTo?.id) {
        onNewChatMessageMain(data.from, data.to, data.message);
      }

      if (data.from !== talkingTo?.id) {
        onNewChatMessageFromUsers(data.from, data.message);
      }
    }
  };

  const onError = (error) => {
    setWsStatus(request.ERROR);
    setWsError(error);
  };

  const onSend = (from, to, message) => {
    const data = {
      messageId: 'test',
      event_type: eventTypes.MESSAGE,
      data: { from, to, message },
    };

    if (socketRef.current && wsStatus === request.SUCCESS) {
      setWsRecentRequest(eventTypes.MESSAGE);
      socketRef.current.send(JSON.stringify(data));

      onNewChatMessageMain(from, to, message);
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

  const onNewChatMessageFromUsers = (fromUserId, message) => {
    setMessageList((list) => {
      let newList = list;

      const foundIndex = list.findIndex((item) => {
        const user = me.id === item.fromUser.id ? item.toUser : item.fromUser;
        return user.id === fromUserId;
      });

      if (foundIndex !== -1) {
        newList = cloneDeep(list);
        const { count = 0 } = newList[foundIndex];
        newList[foundIndex] = {
          ...newList[foundIndex],
          message,
          count: count + 1,
        };
      }

      return newList;
    });
  };

  const onSelectMessageListItem = (fromUserId) => {
    setMessageList((list) => {
      let newList = list;

      const foundIndex = list.findIndex((item) => {
        const user = me.id === item.fromUser.id ? item.toUser : item.fromUser;
        return user.id === fromUserId;
      });

      if (foundIndex !== -1) {
        newList = cloneDeep(list);
        newList[foundIndex].count = 0;
      }

      return newList;
    });
  };

  // METHODS: MESSAGE MAIN
  const onSelectConversation = (user, shouldReset) => {
    if (shouldReset) {
      setConversationListInitialStatus(request.REQUESTING);

      setConversationList([]);
      setConversationListPage(1);
      setConversationListEndOfList(false);
      onSelectMessageListItem(user.id);
    }

    fetchChatMessages(
      {
        id: user?.id,
        page: shouldReset ? 1 : conversationListPage,
        page_size: CONVERATION_LIST_PAGE_SIZE,
      },
      {
        onSuccess: (response) => {
          setTalkingTo(user);
          onFetchConversationListSuccess(response);

          if (shouldReset) {
            setConversationListInitialStatus(response.status);
          }
        },
        onError: (response) => {
          onFetchConversationListError(response);

          if (shouldReset) {
            setConversationListInitialStatus(response.status);
          }
        },
      },
    );
  };

  const onFetchConversationListSuccess = ({ response }) => {
    setConversationListPage(response.page + 1);
    setConversationList((value) => [...response.data.reverse(), ...value]);
    setConversationListEndOfList(!response.data.length);
  };

  const onFetchConversationListError = () => {
    addToast('An error occurred while fetching conversation.', toastTypes.ERROR);
  };

  const onNextPageConversation = (user) => {
    onSelectConversation(user);
  };

  const onNewChatMessageMain = (fromUserId, toUserId, message) => {
    setConversationList((value) => [
      ...value,
      {
        fromUserId,
        id: '',
        message,
        toUserId,
      },
    ]);
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
            talkingTo={talkingTo}
            list={messageList}
            initialStatus={messageListInitialStatus}
            fetchStatus={messageListStatus}
            isEndOfList={messageListEndOfList}
            onNextPage={onNextPageMessageList}
            onSelectConversation={onSelectConversation}
          />
          <MessagesMain
            talkingTo={talkingTo}
            list={conversationList}
            initialStatus={conversationListInitialStatus}
            fetchStatus={conversationListStatus}
            isEndOfList={conversationListEndOfList}
            onNextPage={onNextPageConversation}
            onSend={onSend}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
