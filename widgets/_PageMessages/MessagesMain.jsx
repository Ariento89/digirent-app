/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import cn from 'classnames';
import Button from 'components/Button/index';
import Spinner from 'components/Spinner/index';
import { useMe } from 'hooks/useMe';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useToasts } from 'react-toast-notifications';
import { API_ASSET_URL } from 'services/index';
import { getProfileImage } from 'shared/functions';
import { request, role, toastTypes } from 'shared/types';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import MessagesItem from './widgets/MessagesItem';

const MessagesMain = ({
  talkingTo,
  list,
  initialStatus,
  fetchStatus,
  isEndOfList,
  onNextPage,
  onSend,
}) => {
  // STATES
  const [message, setMessage] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  // REFS
  const scrollbarRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me } = useMe();

  // METHODS
  useEffect(() => {
    if (isReady && initialStatus === request.REQUESTING) {
      setIsReady(false);
    }

    if (initialStatus === request.SUCCESS && scrollbarRef.current && !isReady) {
      setTimeout(() => {
        scrollbarRef?.current?.scrollToBottom();
        setIsReady(true);
      }, 500);
    }
  }, [initialStatus, isReady, scrollbarRef]);

  useEffect(() => {
    if (list.length && lastMessage === null) {
      setLastMessage(list?.[list.length - 1]);
    }

    if (lastMessage !== null && list.length) {
      if (lastMessage !== list?.[list?.length - 1]) {
        setTimeout(() => {
          scrollbarRef?.current?.scrollToBottom();
        }, 500);
      }
    }
  }, [list, lastMessage]);

  const send = () => {
    if (message.trim().length && talkingTo) {
      onSend(me?.id, talkingTo?.id, message.trim());
      setMessage('');

      setTimeout(() => {
        scrollbarRef?.current?.scrollToBottom();
      }, 500);
    } else {
      addToast('An error occurred while sending your mesage.', toastTypes.ERROR);
    }
  };

  const hideList = useCallback(
    () => (initialStatus === request.SUCCESS && !list.length) || initialStatus === request.ERROR,
    [initialStatus, list],
  );

  return (
    <div className="col-12 col-lg-7 col-xl-8 mt-5 mt-lg-0">
      <Spinner isLoading={initialStatus === request.REQUESTING}>
        <div className="user-header">
          <div
            className="user-photo"
            style={{ backgroundImage: getProfileImage(talkingTo?.profileImageUrl) }}
          />
          <div
            className={cn('user-info', { 'with-border': me?.role === role.LANDLORD && talkingTo })}
          >
            {talkingTo && (
              <>
                <p className="name">
                  {talkingTo?.firstName} {talkingTo?.lastName}
                </p>
                <p className="role">{talkingTo?.role}</p>
              </>
            )}
          </div>
          {me?.role === role.LANDLORD && talkingTo && (
            <Button className="btn-send-booking-request">
              SEND <span className="font-weight-bold"> BOOKING REQUEST </span>
            </Button>
          )}
        </div>

        <div className="main-message mt-3">
          <Scrollbars
            ref={scrollbarRef}
            autoHeight
            autoHeightMin="100%"
            autoHeightMax="100%"
            className={cn({ 'd-none': hideList() })}
            style={{ height: '100%', paddingBottom: 10 }}
          >
            <div className="main-message-content" style={{ opacity: isReady ? 1 : 0 }}>
              {initialStatus === request.SUCCESS &&
                fetchStatus === request.REQUESTING &&
                talkingTo && (
                  <Spinner isLoading>
                    <div className="user-messages-spinner" />
                  </Spinner>
                )}

              {initialStatus === request.SUCCESS &&
                fetchStatus !== request.REQUESTING &&
                !isEndOfList &&
                talkingTo && (
                  <span
                    className="user-messages-load-more mb-4"
                    onClick={() => onNextPage(talkingTo, false)}
                  >
                    LOAD MORE MESSAGES...
                  </span>
                )}

              {isEndOfList && talkingTo && (
                <span className="user-messages-end-conversation mb-4">END OF CONVERSATION</span>
              )}

              {list.map((item, index) => (
                <MessagesItem
                  key={index}
                  message={item.message}
                  isYou={me.id === item?.fromUserId}
                />
              ))}
            </div>
          </Scrollbars>

          {/* EMPTY */}
          {initialStatus === request.SUCCESS && !list.length && (
            <StateList
              className="state-list"
              title="LIST IS EMPTY"
              description="You have not talked to anyone yet."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {initialStatus === request.ERROR && (
            <StateList
              className="state-list"
              title="OOPS!"
              description="An error ocurred while fetching your messages."
              type={stateListTypes.ERROR}
            />
          )}

          <div className="footer">
            <textarea
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              placeholder="Message"
              disabled={!talkingTo || initialStatus !== request.SUCCESS}
            />
            <Button
              onClick={send}
              disabled={!talkingTo || initialStatus !== request.SUCCESS || !message.length}
            >
              <img src="/images/icon/icon-email-outline.svg" alt="email icon" />
            </Button>
          </div>
        </div>
      </Spinner>
    </div>
  );
};

export default MessagesMain;
