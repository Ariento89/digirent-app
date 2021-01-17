/* eslint-disable react-hooks/exhaustive-deps */
import { NextArrow, PrevArrow } from 'components/SlickArrows';
import dayjs from 'dayjs';
import { useBlog } from 'hooks/useBlog';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { request } from 'shared/types';
import BlogInfo from 'widgets/BlogInfo/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';

const blogsSlickSettings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  responsive: [
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
};

const BLOG_PAGE = 1;
const BLOG_PAGE_SIZE = 6;

const HomeBlog = () => {
  // STATES
  const [blogs, setBlogs] = useState([]);

  // CUSTOM HOOKS
  const { fetchBlogPosts, status } = useBlog();

  // METHODS
  useEffect(() => {
    fetchBlogPosts(
      {
        page: BLOG_PAGE,
        page_size: BLOG_PAGE_SIZE,
      },
      {
        onSuccess: onFetchSuccess,
      },
    );
  }, []);

  const onFetchSuccess = ({ response }) => {
    setBlogs(response);
  };

  return (
    <div className="blog container">
      <h3 className="main-title">BLOG</h3>

      {status === request.SUCCESS && !!blogs.length && (
        <Slider {...blogsSlickSettings} className="blogs">
          {blogs.map((blog) => {
            const date = dayjs(blog.updatedAt);

            return (
              <div key={blog.id} className="item">
                <BlogInfo
                  link={`blog/${blog.id}`}
                  day={date.format('DD')}
                  month={date.format('MMM')}
                  title={blog.title}
                  content={blog.content}
                />
              </div>
            );
          })}
        </Slider>
      )}

      {/* EMPTY */}
      {status === request.SUCCESS && !blogs.length && (
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
  );
};

export default HomeBlog;
