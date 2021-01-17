import cn from 'classnames';
import Button from 'components/Button/index';
import { truncate } from 'lodash';
import { useRouter } from 'next/router';

const BlogInfoRecent = ({ classNames, title, day, month, year, link }) => {
  // CUSTOM HOOKS
  const router = useRouter();

  // METHODS
  const onView = () => {
    router.push(link);
  };

  return (
    <div className={cn('item main-box', classNames)}>
      <div className="image" />

      <div className="content">
        <div className="date">
          <span className="font-weight-bold">{day}</span> {month}
          <span className="year">{year}</span>
        </div>
        <span className="main-desc title">{truncate(title, { length: 75 })}</span>
      </div>

      <Button onClick={onView}>
        <img src="/images/icon/icon-caret-right-white.svg" alt="icon" />
      </Button>
    </div>
  );
};

export default BlogInfoRecent;
