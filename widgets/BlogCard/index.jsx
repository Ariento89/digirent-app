import Link from 'next/link';
import cn from 'classnames';

export const BlogCard = ({ classNames, day, month, title, description, link }) => (
  <div className={cn('blog-card main-box', classNames)}>
    <div className="blog-image">
      <img className="bottom-design" src="/images/blog-round-line.svg" alt="outline" />
      <div className="overlay" />
      <div className="date">
        <span className="font-weight-bold text-primary">{day}</span> {month}
      </div>
    </div>

    <h5 className="title font-weight-bold text-center">{title}</h5>
    <p className="main-desc text-center mt-2">{description}</p>

    <Link href={link}>
      <button type="button" className="button min-width mr-3 d-block mx-auto mt-4">
        Read More
      </button>
    </Link>
  </div>
);
