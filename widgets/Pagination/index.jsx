import cn from 'classnames';

const Pagination = ({ className }) => (
  <div className={cn('pagination', className)}>
    <button type="button" className="btn-arrow prev">
      <img src="/images/icon/icon-caret-left-white.svg" alt="icon" />
    </button>
    <div className="pages">
      <span className="number active">
        01
        <span className="line" />
      </span>
      <span className="number">02</span>
      <span className="number">03</span>
      <span className="number">04</span>
      <span className="number">05</span>
    </div>
    <button type="button" className="btn-arrow next">
      <img src="/images/icon/icon-caret-right-white.svg" alt="icon" />
    </button>
  </div>
);

export default Pagination;
