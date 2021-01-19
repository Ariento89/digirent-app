/* eslint-disable react-hooks/exhaustive-deps */
import { useBlog } from 'hooks/useBlog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PageWrapper from 'widgets/PageWrapper';
import BlogSidebar from 'widgets/_PageBlog/BlogSidebar';
import BlogPostMain from 'widgets/_PageBlogPost/BlogPostMain';

const Page = () => {
  // STATUS
  const [blogModalVisible, setBlogModalVisible] = useState(false);
  const [blogPost, setBlogPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  // CUSTOM HOOKS
  const router = useRouter();
  const { id: blogPostId } = router.query;
  const { fetchBlogPosts, status: fetchBlogPostsStatus } = useBlog();
  const { getBlogPost, status: getBlogPostStatus } = useBlog();

  // METHODS
  useEffect(() => {
    if (blogPostId) {
      getBlogPost(
        { id: blogPostId },
        {
          onSuccess: onGetBlogPostSuccess,
          onError: onGetBlogPostError,
        },
      );
    }

    fetchBlogPosts(null, {
      onSuccess: onFetchBlogPostsSuccess,
    });
  }, [blogPostId]);

  const onGetBlogPostSuccess = ({ response }) => {
    setBlogPost(response);
  };

  const onGetBlogPostError = () => {
    router.replace('/404');
  };

  const onFetchBlogPostsSuccess = ({ response }) => {
    setBlogPosts(response.slice(0, 3));
  };

  return (
    <>
      <PageWrapper title="DigiRent - Blog" pageName="blog-article-inside">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
        <div className="container-fluid container-lg mt-5">
          <div className="row">
            <BlogPostMain
              blogPost={blogPost}
              status={getBlogPostStatus}
              onShowComment={() => setBlogModalVisible(true)}
            />
            <BlogSidebar list={blogPosts} />
          </div>
        </div>
      </PageWrapper>

      <Modal
        show={blogModalVisible}
        onHide={() => setBlogModalVisible(false)}
        id="comment-modal"
        centered
      >
        <Modal.Body>
          <div className="modal-background" />
          <button
            type="button"
            className="button-nav primary s-40"
            onClick={() => setBlogModalVisible(false)}
          >
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content">
            <div className="rounded-icon mx-auto">
              <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
            </div>

            <span className="main-title mt-4 d-block font-weight-bold text-center">
              ADD YOUR COMMENT
            </span>
            <span className="main-description font-weight-light mt-1 d-block text-center text-primary">
              Please fill in the form
            </span>

            <div className="form-fields mx-auto mt-5 px-4">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="field-group">
                    <div className="field-icon">
                      <img src="/images/icon/icon-text-primary.svg" alt="item icon" />
                    </div>
                    <span className="field-divider" />
                    <input type="text" placeholder="Name" required />
                  </div>
                </div>

                <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                  <div className="field-group">
                    <div className="field-icon">
                      <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
                    </div>
                    <span className="field-divider" />
                    <input type="email" placeholder="Email Address" required />
                  </div>
                </div>
              </div>

              <div className="field-group mt-3 mt-sm-4">
                <div className="field-icon">
                  <img src="/images/icon/icon-left-align-primary.svg" alt="item icon" />
                </div>
                <span className="field-divider long" />
                <textarea placeholder="Message" required />
              </div>

              <button type="button" className="button d-block mt-4 mx-auto">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
