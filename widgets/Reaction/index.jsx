import cn from 'classnames';

export const reactionType = {
  LIKE: 'like',
  DISLIKE: 'dislike',
};

export const Reaction = ({
  reaction,
  onReact,
  classNames,
  likeIconClassNames,
  dislikeIconClassNames,
}) => (
  <div className={cn('reaction', classNames)}>
    <div
      className={cn('item rounded-icon small', likeIconClassNames)}
      onClick={() => onReact(reactionType.LIKE)}
    >
      {reaction === reactionType.LIKE ? (
        <img src="/images/icon/icon-like-active.svg" className="icon-like" alt="icon" />
      ) : (
        <img src="/images/icon/icon-like.svg" className="icon-like" alt="icon" />
      )}
    </div>
    <div
      className={cn('item rounded-icon small', dislikeIconClassNames)}
      onClick={() => onReact(reactionType.DISLIKE)}
    >
      {reaction === reactionType.DISLIKE ? (
        <img src="/images/icon/icon-dislike-active.svg" className="icon-dislike" alt="icon" />
      ) : (
        <img src="/images/icon/icon-dislike.svg" className="icon-dislike" alt="icon" />
      )}
    </div>
  </div>
);
