import cn from 'classnames';
import Button from 'components/Button/index';
import { useMe } from 'hooks/useMe';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { EMPTY_PLACEHOLDER } from 'shared/constants';
import { role } from 'shared/types';
import MessagesItem from './widgets/MessagesItem';

const MessagesMain = ({ onSend, talkingTo }) => {
  // STATES
  const [message, setMessage] = useState('');

  // CUSTOM HOOKS
  const { me } = useMe();

  // METHODS
  const send = () => {
    if (message?.length > 0) {
      onSend(me?.id, null, message.trim());
    }
  };

  return (
    <div className="col-12 col-lg-7 col-xl-8 mt-5 mt-lg-0">
      <div className="user-header">
        <div className="user-photo" />
        <div className={cn('user-info', { 'with-border': me?.role === role.LANDLORD })}>
          <p className="name">{talkingTo?.name || EMPTY_PLACEHOLDER}</p>
          <p className="role">{talkingTo?.role || EMPTY_PLACEHOLDER} </p>
        </div>
        {me?.role === role.LANDLORD && (
          <Button className="btn-send-booking-request">
            SEND <span className="font-weight-bold"> BOOKING REQUEST </span>
          </Button>
        )}
      </div>

      <div className="main-message mt-3">
        <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="100%" style={{ height: '100%' }}>
          <div className="content" id="main-message-content">
            <MessagesItem
              message="Your house is amazing. Every window is an embodiment of art."
              isYou
            />
            <MessagesItem message="Your house is amazing. Every window is an embodiment of art." />
            <MessagesItem
              message="Your house is amazing. Every window is an embodiment of art."
              isYou
            />
            <MessagesItem message="Your house is amazing. Every window is an embodiment of art." />
            <MessagesItem
              message="Your house is amazing. Every window is an embodiment of art."
              isYou
            />
            <MessagesItem
              message="Your house is amazing. Every window is an embodiment of art."
              isYou
            />
            <MessagesItem message="Your house is amazing. Every window is an embodiment of art." />
            <MessagesItem
              message="Your house is amazing. Every window is an embodiment of art."
              isYou
            />
            <MessagesItem
              message="Your house is amazing. Every window is an embodiment of art."
              isYou
            />
          </div>
        </Scrollbars>

        <div className="footer">
          <textarea onChange={(event) => setMessage(event.target.value)} placeholder="Message" />
          <Button onClick={send} disabled={!talkingTo}>
            <img src="/images/icon/icon-email-outline.svg" alt="email icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesMain;
