import React from 'react';
import cn from 'classnames';

const MessagesItem = ({ message, isYou }) => (
  <p className={cn('message', { you: isYou, person: !isYou })}>{message}</p>
);

export default MessagesItem;
