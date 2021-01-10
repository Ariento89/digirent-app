/* eslint-disable operator-linebreak */
import cn from 'classnames';
import Spinner from 'components/Spinner/index';
import React, { useCallback, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { request } from 'shared/types';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import MessagesPerson from './widgets/MessagesPerson';

const SCROLLBARS_HEIGHT = 575;

const MessagesList = ({
  onSelectConversation,
  initialLoadingStatus,
  fetchStatus,
  list,
  onNextPage,
}) => {
  // STATES
  const [isFetching, setIsFetching] = useState(false);

  // METHODS
  const onUpdateScrollbar = (values) => {
    if (isFetching || fetchStatus === request.ERROR || !list?.length) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = values;
    const pad = 50;

    const t = (scrollTop + pad) / (scrollHeight - clientHeight);
    if (t > 1) {
      setIsFetching(true);
      onNextPage(() => {
        setIsFetching(false);
      });
    }
  };

  const hideList = useCallback(
    () =>
      (initialLoadingStatus === request.SUCCESS && !list.length) ||
      initialLoadingStatus === request.ERROR,
    [initialLoadingStatus, list],
  );

  return (
    <div className="col-12 col-lg-5 col-xl-4">
      <div className="position-relative d-flex align-items-center">
        <div className="message-icon">
          <img src="/images/icon/icon-user-white.svg" alt="user icon" />
        </div>

        <div className={cn('user-messages main-box', { center: hideList() })}>
          <Spinner
            className={cn({ 'd-none': hideList() })}
            isLoading={initialLoadingStatus === request.REQUESTING}
          >
            <Scrollbars
              autoHeight
              autoHeightMin="100%"
              autoHeightMax="100%"
              style={{ height: SCROLLBARS_HEIGHT }}
              onUpdate={onUpdateScrollbar}
            >
              {list.map((item, index) => (
                <div onClick={() => onSelectConversation(item)}>
                  <MessagesPerson
                    name={item.name}
                    time="01:10pm"
                    count={item.count}
                    recentMesage={item.description}
                    className={index !== 0 ? 'mt-3' : ''}
                  />
                </div>
              ))}

              {isFetching && (
                <Spinner isLoading>
                  <div className="user-messages-spinner" />
                </Spinner>
              )}
            </Scrollbars>
          </Spinner>

          {/* EMPTY */}
          {initialLoadingStatus === request.SUCCESS && !list.length && (
            <StateList
              title="LIST IS EMPTY"
              description="You have not talked to anyone yet."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {initialLoadingStatus === request.ERROR && (
            <StateList
              title="OOPS!"
              description="An error ocurred while fetching your messages."
              type={stateListTypes.ERROR}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesList;
