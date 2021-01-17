import cn from 'classnames';
import Button from 'components/Button/index';
import { truncate, upperCase } from 'lodash';
import Link from 'next/link';

const BlogInfo = ({ classNames, day, month, title, content, link }) => (
  <div className={cn('blog-info main-box', classNames)}>
    <div className="blog-image">
      <img className="bottom-design" src="/images/blog-round-line.svg" alt="outline" />
      <div className="overlay" />
      <div className="date">
        <span className="font-weight-bold text-primary">{day}</span> {upperCase(month)}
      </div>
    </div>

    <h5 className="title font-weight-bold text-center">{title}</h5>
    <p className="main-desc text-center mt-2">{truncate(content, { length: 125 })}</p>

    <Link href={link}>
      <Button className="min-width mr-3 d-block mx-auto mt-4">Read More</Button>
    </Link>
  </div>
);

export default BlogInfo;
