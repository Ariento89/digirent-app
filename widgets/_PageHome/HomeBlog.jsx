/* eslint-disable react-hooks/exhaustive-deps */
import { NextArrow, PrevArrow } from 'components/SlickArrows';
import { useBlog } from 'hooks/useBlog';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { request } from 'shared/types';
import BlogCard from 'widgets/BlogCard/index';
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
          {blogs.map((blog) => (
            <div key={blog.id} className="item">
              <BlogCard
                day={blog.day}
                month={blog.month}
                title={blog.title}
                description={blog.description}
                link={blog.link}
              />
            </div>
          ))}
        </Slider>
      )}

      {/* EMPTY */}
      {status === request.SUCCESS && !blogs.length && (
        <StateList
          title="LIST IS EMPTY"
          description="No blogs posted yet."
          type={stateListTypes.EMPTY}
        />
      )}

      {/* ERROR */}
      {status === request.ERROR && (
        <StateList
          title="OOPS!"
          description="An error ocurred while fetching blog posts."
          type={stateListTypes.ERROR}
        />
      )}
    </div>
  );
};

export default HomeBlog;
