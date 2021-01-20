const BlogArchive = ({ list }) =>
  !!list?.length && (
    <div className="archives">
      <p className="main-subtitle text-left">ARCHIVES</p>

      <div className="list main-box">
        {list.map((archive) => (
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
  );

export default BlogArchive;
