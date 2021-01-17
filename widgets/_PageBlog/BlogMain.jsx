/* eslint-disable react-hooks/exhaustive-deps */
import { useBlog } from 'hooks/useBlog';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import BlogInfo from 'widgets/BlogInfo';

const BLOG_POSTS_PAGE_SIZE = 8;

const BlogMain = () => {
  // STATES
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogPostsPage, setBlogPostsPage] = useState(1);
  const [blogPostsEndOfList, setBlogPostsEndOfList] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchBlogPosts } = useBlog();

  // METHODS
  useEffect(() => {
    onFetchBlogPosts();
  }, []);

  const onFetchBlogPosts = () => {
    fetchBlogPosts(
      {
        page: blogPostsPage,
        page_size: BLOG_POSTS_PAGE_SIZE,
      },
      {
        onSuccess: onFetchSuccess,
        onError: onFetchError,
      },
    );
  };

  const onFetchSuccess = ({ response }) => {
    setBlogPostsPage(response.page + 1);
    setBlogPosts((value) => [...value, ...response.data]);
    setBlogPostsEndOfList(!response.data.length);
  };

  const onFetchError = () => {
    addToast('An error occurred while fetching blog posts.', toastTypes.ERROR);
  };

  return (
    <div className="col-12 col-lg-8">
      <h3 className="main-title">BLOG</h3>

      <div className="blogs row">
        {[].map((blog) => (
          <div className="col-12 col-md-6">
            <BlogInfo
              classNames="item"
              day={blog.day}
              month={blog.month}
              title={blog.title}
              content={blog.description}
              link={blog.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogMain;
