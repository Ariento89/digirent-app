import cn from 'classnames';
import { useState } from 'react';

export const socialMediaDirection = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const SocialMedias = ({ direction, classNames }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn('social-medias-wrapper', classNames, { active: isActive })}>
      <div className="rounded-icon small icon-share" onClick={() => setIsActive((value) => !value)}>
        <div className="active-icon" />
        <img className="inactive-icon" src="/images/icon/icon-share-gray.svg" alt="item icon" />
      </div>

      <div
        className={cn('social-medias', {
          left: direction === socialMediaDirection.LEFT,
          right: direction === socialMediaDirection.RIGHT,
        })}
      >
        <div className="icons">
          <a href="#">
            <img src="/images/social-media/facebook.svg" className="icon" alt="facebook" />
          </a>
          <a href="#">
            <img src="/images/social-media/instagram.svg" className="icon" alt="instagram" />
          </a>
          <a href="#">
            <img src="/images/social-media/linkedin.svg" className="icon" alt="linkedin" />
          </a>
          <a href="#">
            <img src="/images/social-media/youtube.svg" className="icon" alt="youtube" />
          </a>
          <a href="#">
            <img src="/images/icon/icon-link.svg" className="icon icon-link" alt="icon link" />
          </a>
        </div>
      </div>
    </div>
  );
};

SocialMedias.defaultProps = {
  direction: socialMediaDirection.LEFT,
};
