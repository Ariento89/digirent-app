import { NextArrow, PrevArrow } from 'components/SlickArrows';
import Slider from 'react-slick';
import { BlogCard } from 'widgets/BlogCard';

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

const Blog = () => (
  <div className="blog container">
    <h3 className="main-title">BLOG</h3>

    <Slider {...blogsSlickSettings} className="blogs">
      {blogs.map((blog) => (
        <div className="item">
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
  </div>
);

export default Blog;
