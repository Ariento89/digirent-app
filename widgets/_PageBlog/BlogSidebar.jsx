import BlogArchive from './BlogArchive';
import BlogRecentPosts from './BlogRecentPosts';

const BlogSidebar = () => (
  <div className="col-12 col-lg-4 sidebar">
    <div className="search-bar">
      <img src="/images/icon/icon-search-primary.svg" alt="icon-search" />
      <input type="text" placeholder="Search" />
    </div>

    <BlogRecentPosts list={[]} />

    <BlogArchive list={[]} />
  </div>
);

export default BlogSidebar;
