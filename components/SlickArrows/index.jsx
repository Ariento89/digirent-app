import cn from 'classnames';

export const NextArrow = ({ onClick, responsive }) => (
  <button
    type="button"
    className={cn('button btn-next slick-arrow', { 'hide-xs': responsive })}
    onClick={onClick}
  >
    <img src="/images/icon/icon-caret-right-white.svg" alt="next arrow" />
  </button>
);

export const PrevArrow = ({ onClick, responsive }) => (
  <button
    type="button"
    className={cn('button btn-prev slick-arrow', { 'hide-xs': responsive })}
    onClick={onClick}
  >
    <img src="/images/icon/icon-caret-left-white.svg" alt="next arrow" />
  </button>
);
