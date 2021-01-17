import PageWrapper from 'widgets/PageWrapper';
import BlogMain from 'widgets/_PageBlog/BlogMain';
import BlogSidebar from 'widgets/_PageBlog/BlogSidebar';

const Page = () => (
  <PageWrapper title="DigiRent - Blog" pageName="blog">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container-fluid container-lg mt-5">
      <div className="row">
        <BlogMain />
        <BlogSidebar />
      </div>
    </div>
  </PageWrapper>
);

export default Page;
