/* eslint-disable jsx-a11y/anchor-is-valid */
import PageWrapper from 'widgets/PageWrapper';
import Link from 'next/link';
import { userTypes } from 'shared/types';

const Page = () => (
  <PageWrapper title="DigiRent - Sitemap" pageName="sitemap">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container">
      <h3 className="main-title">SITEMAP</h3>

      <div className="sitemaps">
        <Link href="#">
          <a>Renting in Amsterdam</a>
        </Link>
        <Link href="#">
          <a>Renting in Den Haag</a>
        </Link>
        <Link href="#">
          <a>Renting in Rotterdam</a>
        </Link>
        <Link href="#">
          <a>Renting in Eindhoven</a>
        </Link>
        <Link href="#">
          <a>Renting in Utrecht</a>
        </Link>
        <Link href="#">
          <a>Renting in Arnhem</a>
        </Link>
        <Link href="about">
          <a>About Us</a>
        </Link>
        <Link href="media">
          <a>Media</a>
        </Link>
        <Link href="/extra-information">
          <a>Terms &amp; Conditions</a>
        </Link>
        <Link href="/extra-information#data-security">
          <a>Data Security</a>
        </Link>
        <Link href="/extra-information#cookies">
          <a>Cookie Policy</a>
        </Link>
        <Link href="/sitemap">
          <a>Sitemap</a>
        </Link>
        <Link href="#">
          <a>How to rent</a>
        </Link>
        <Link href="/pricing">
          <a>Pricing</a>
        </Link>
        <Link href="/international-students-expats">
          <a>Blog for internationals</a>
        </Link>
        <Link href={`/rental-tips#${userTypes.TENANT}`}>
          <a>Rental Tips</a>
        </Link>
        <Link href="#">
          <a>How to rent out</a>
        </Link>
        <Link href="/pricing">
          <a>Pricing</a>
        </Link>
        <Link href={`/rental-tips#${userTypes.TENANT}`}>
          <a>Rental Tips</a>
        </Link>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
        <Link href="/contact">
          <a>Contact Us</a>
        </Link>
        <Link href="/careers">
          <a>Careers</a>
        </Link>
      </div>
    </div>
  </PageWrapper>
);

export default Page;
