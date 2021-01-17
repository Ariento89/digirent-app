import dayjs from 'dayjs';
import BlogInfoRecent from 'widgets/BlogInfoRecent/index';

const BlogRecentPosts = ({ list }) =>
  !!list?.length && (
    <div className="recent-blogs">
      <p className="main-subtitle text-left">RECENT BLOGS</p>

      <div className="list">
        {list.map((blog) => {
          const date = dayjs(blog.updatedAt);

          return (
            <BlogInfoRecent
              link={`blog/${blog.id}`}
              title={blog.title}
              day={date.format('DD')}
              month={date.format('MMM')}
              year={date.format('YYYY')}
            />
          );
        })}
      </div>
    </div>
  );

export default BlogRecentPosts;
