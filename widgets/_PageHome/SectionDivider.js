import Link from 'next/link';

const SectionDivider = ({ title, description, link }) => (
  <div className="section-divider">
    <div className="title main-desc">{title}</div>
    <div className="action">
      <p className="main-desc">{description}</p>
      <Link href={link}>
        <button className="button">SHOW MORE</button>
      </Link>
    </div>
  </div>
);

export default SectionDivider;
