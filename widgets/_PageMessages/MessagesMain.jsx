/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import cn from 'classnames';
import Button from 'components/Button/index';
import Spinner from 'components/Spinner/index';
import { useMe } from 'hooks/useMe';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useToasts } from 'react-toast-notifications';
import { request, role, toastTypes } from 'shared/types';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import MessagesItem from './widgets/MessagesItem';

const MessagesMain = ({
  list,
  initialLoadingStatus,
  fetchStatus,
  onNextPage,
  onSend,
  talkingTo,
  isEndOfList,
}) => {
  // STATES
  const [message, setMessage] = useState('');
  const [isReady, setIsReady] = useState(false);

  // REFS
  const scrollbarRef = useRef(null);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me } = useMe();

  // METHODS
  useEffect(() => {
    if (initialLoadingStatus === request.SUCCESS && scrollbarRef.current) {
      setTimeout(() => {
        scrollbarRef?.current?.scrollToBottom();
        setIsReady(true);
      }, 500);
    }
  }, [initialLoadingStatus, scrollbarRef]);

  const send = () => {
    if (message.length && talkingTo) {
      onSend(me?.id, talkingTo?.id, 'adsfadsf');
      setMessage('');
    } else {
      addToast('An error occurred while sending your mesage.', toastTypes.ERROR);
    }
  };

  const hideList = useCallback(
    () =>
      (initialLoadingStatus === request.SUCCESS && !list.length) ||
      initialLoadingStatus === request.ERROR,
    [initialLoadingStatus, list],
  );

  return (
    <div className="col-12 col-lg-7 col-xl-8 mt-5 mt-lg-0">
      <Spinner isLoading={initialLoadingStatus === request.REQUESTING}>
        <div className="user-header">
          <div className="user-photo" />
          <div
            className={cn('user-info', { 'with-border': me?.role === role.LANDLORD && talkingTo })}
          >
            <p className="name">{talkingTo?.name}</p>
            <p className="role">{talkingTo?.role} </p>
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
            style={{ height: '100%' }}
          >
            <div className="main-message-content" style={{ opacity: isReady ? 1 : 0 }}>
              {fetchStatus === request.REQUESTING && talkingTo && (
                <Spinner isLoading>
                  <div className="user-messages-spinner" />
                </Spinner>
              )}

              {!fetchStatus !== request.REQUESTING && talkingTo && (
                <span className="user-messages-load-more" onClick={onNextPage}>
                  Load More Messages...
                </span>
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
          {initialLoadingStatus === request.SUCCESS && !list.length && (
            <StateList
              className="state-list"
              title="LIST IS EMPTY"
              description="You have not talked to anyone yet."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {initialLoadingStatus === request.ERROR && (
            <StateList
              className="state-list"
              title="OOPS!"
              description="An error ocurred while fetching your messages."
              type={stateListTypes.ERROR}
            />
          )}

          <div className="footer">
            <textarea onChange={(event) => setMessage(event.target.value)} placeholder="Message" />
            <Button
              onClick={send}
              disabled={!talkingTo || initialLoadingStatus !== request.SUCCESS}
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
