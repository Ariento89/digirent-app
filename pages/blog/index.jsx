import { useState } from 'react';
import { BlogCard } from 'widgets/BlogCard';
import PageWrapper from 'widgets/PageWrapper';

const blogs = [
  {
    day: '18',
    month: 'AUG',
    title: 'FUN FACTS ABOUT NETHERLANDS',
    description:
      'And many other curiosities about this fascinating country. Netherlands is such an amazing place to discover',
    link: 'blog-article-inside',
  },
  {
    day: '18',
    month: 'AUG',
    title: 'FUN FACTS ABOUT NETHERLANDS',
    description:
      'And many other curiosities about this fascinating country. Netherlands is such an amazing place to discover',
    link: 'blog-article-inside',
  },
  {
    day: '18',
    month: 'AUG',
    title: 'FUN FACTS ABOUT NETHERLANDS',
    description:
      'And many other curiosities about this fascinating country. Netherlands is such an amazing place to discover',
    link: 'blog-article-inside',
  },
  {
    day: '18',
    month: 'AUG',
    title: 'FUN FACTS ABOUT NETHERLANDS',
    description:
      'And many other curiosities about this fascinating country. Netherlands is such an amazing place to discover',
    link: 'blog-article-inside',
  },
];

const archives = [
  { date: 'March 2018', number: 20 },
  { date: 'March 2018', number: 20 },
  { date: 'April 2018', number: 40 },
  { date: 'January 2020', number: 107 },
  { date: 'February 2020', number: 20 },
  { date: 'March 2020', number: 107 },
  { date: 'May 2020', number: 20 },
];

const recentBlogs = [
  {
    day: '18',
    month: 'AUG',
    year: '2020',
    description: 'Fun facts about Netherlands',
  },
  {
    day: '18',
    month: 'AUG',
    year: '2020',
    description: 'Fun facts about Netherlands',
  },
  {
    day: '18',
    month: 'AUG',
    year: '2020',
    description: 'Fun facts about Netherlands',
  },
];

const Page = () => {
  const [moreBlogsVisible, setMoreBlogsVisible] = useState(false);

  const toggleBlogsVisible = () => setMoreBlogsVisible((value) => !value);

  return (
    <PageWrapper title="DigiRent - Blog" pageName="blog">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
      <div className="container-fluid container-lg mt-5">
        <div className="row">
          <div className="col-12 col-lg-8">
            <h3 className="main-title">BLOG</h3>

            <div className="blogs row">
              {blogs.map((blog) => (
                <div className="col-12 col-md-6">
                  <BlogCard
                    classNames="item"
                    day={blog.day}
                    month={blog.month}
                    title={blog.title}
                    description={blog.description}
                    link={blog.link}
                  />
                </div>
              ))}
            </div>

            {moreBlogsVisible && (
              <div className="blogs mt-0 row">
                {blogs.map((blog) => (
                  <div className="col-12 col-md-6">
                    <BlogCard
                      classNames="item"
                      day={blog.day}
                      month={blog.month}
                      title={blog.title}
                      description={blog.description}
                      link={blog.link}
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              className="button btn-show-more d-block mx-auto"
              onClick={toggleBlogsVisible}
            >
              {moreBlogsVisible ? (
                <img src="/images/icon/icon-caret-up-white.svg" alt="icon" />
              ) : (
                <img src="/images/icon/icon-caret-down-white.svg" alt="icon" />
              )}
            </button>
          </div>

          <div className="col-12 col-lg-4 sidebar">
            <div className="search-bar">
              <img src="/images/icon/icon-search-primary.svg" alt="icon-search" />
              <input type="text" placeholder="Search" />
            </div>

            <div className="recent-blogs">
              <p className="main-subtitle text-left">RECENT BLOGS</p>

              <div className="list">
                {recentBlogs.map((blog) => (
                  <div className="item main-box">
                    <div className="image" />

                    <div className="content">
                      <div className="date">
                        <span className="font-weight-bold">{blog.day}</span> {blog.month}
                        <span className="year">{blog.year}</span>
                      </div>
                      <span className="main-desc title">{blog.description}</span>
                    </div>

                    <button type="button" className="button">
                      <img src="/images/icon/icon-caret-right-white.svg" alt="icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="archives">
              <p className="main-subtitle text-left">ARCHIVES</p>

              <div className="list main-box">
                {archives.map((archive) => (
                  <div className="item">
                    <button type="button" className="button white">
                      <img src="/images/icon/icon-arrow-right.svg" alt="icon" />
                    </button>

                    <div className="content">
                      <span className="date main-desc">{archive.date}</span>
                      <span className="number main-desc text-primary">{archive.number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
