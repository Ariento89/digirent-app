/* eslint-disable react-hooks/exhaustive-deps */
import { useBlog } from 'hooks/useBlog';
import { useEffect, useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import BlogMain from 'widgets/_PageBlog/BlogMain';
import BlogSidebar from 'widgets/_PageBlog/BlogSidebar';

const Page = () => {
  // STATUS
  const [blogPosts, setBlogPosts] = useState([]);

  // CUSTOM HOOKS
  const { fetchBlogPosts } = useBlog();

  // METHODS
  useEffect(() => {
    fetchBlogPosts(null, {
      onSuccess: onFetchBlogPostsSuccess,
    });
  }, []);

  const onFetchBlogPostsSuccess = ({ response }) => {
    setBlogPosts(response.slice(0, 3));
  };
  return (
    <PageWrapper title="DigiRent - Blog" pageName="blog">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
      <div className="container-fluid container-lg mt-5">
        <div className="row">
          <BlogMain />
          <BlogSidebar list={blogPosts} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
