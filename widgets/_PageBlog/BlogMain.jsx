/* eslint-disable react-hooks/exhaustive-deps */
import { useBlog } from 'hooks/useBlog';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { request, toastTypes } from 'shared/types';
import BlogInfo from 'widgets/BlogInfo';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import dayjs from 'dayjs';
import Spinner from 'components/Spinner/index';

const BLOG_POSTS_PAGE_SIZE = 8;

const BlogMain = () => {
  // STATES
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogPostsPage, setBlogPostsPage] = useState(1);
  const [blogPostsEndOfList, setBlogPostsEndOfList] = useState(false);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchBlogPosts, status } = useBlog();

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
    setBlogPostsPage((value) => value + 1);
    setBlogPosts((value) => [...value, ...response]);
    // setBlogPostsEndOfList(!response.data.length);
  };

  const onFetchError = () => {
    addToast('An error occurred while fetching blog posts.', toastTypes.ERROR);
  };

  return (
    <div className="col-12 col-lg-8">
      <h3 className="main-title">BLOG</h3>

      <Spinner loadingText="Fetching blog posts..." isLoading={status === request.REQUESTING}>
        <div className="blogs">
          {status === request.SUCCESS && !!blogPosts.length && (
            <div className="row">
              {blogPosts.map((blog) => {
                const dateCreated = dayjs(blog.createdAt);

                return (
                  <div className="col-12 col-md-6 item-column">
                    <BlogInfo
                      link={`/blog/${blog.id}`}
                      day={dateCreated.format('DD')}
                      month={dateCreated.format('MMM')}
                      title={blog.title}
                      content={blog.content}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* EMPTY */}
          {status === request.SUCCESS && !blogPosts.length && (
            <StateList
              className="mt-4"
              title="NO BLOG POSTS"
              description="No blogs posted yet."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {status === request.ERROR && (
            <StateList
              className="mt-4"
              title="OOPS!"
              description="An error ocurred while fetching blog posts."
              type={stateListTypes.ERROR}
            />
          )}
        </div>
      </Spinner>
    </div>
  );
};

export default BlogMain;
