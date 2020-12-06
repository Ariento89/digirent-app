/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { userTypes } from 'shared/types';

const index = () => (
  <footer className="layout-footer">
    <div className="subscriber-bg">
      <img src="/images/subscriber-bg.svg" alt="subscriber" />
    </div>

    <div className="subscriber">
      <div className="logo">
        <h1 className="text">DIGI RENT</h1>
      </div>
      <p className="subscriber-title">
        <span className="text-primary font-weight-bold">subscribe </span>
        <br className="d-block d-sm-none" />
        to receive our news
      </p>
      <div className="subscriber-form">
        <input placeholder="e-mail" />
        <button type="button">
          <img
            src="/images/icon/icon-email-outline.svg"
            className="icon"
            alt="facebook"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>

    <div className="social-medias">
      <div className="icons">
        <a href="#">
          <img
            src="/images/social-media/facebook.svg"
            className="icon"
            alt="facebook"
            width={40}
            height={40}
          />
        </a>
        <a href="#">
          <img
            src="/images/social-media/instagram.svg"
            className="icon"
            alt="instagram"
            width={40}
            height={40}
          />
        </a>
        <a href="#">
          <img
            src="/images/social-media/linkedin.svg"
            className="icon"
            alt="linkedin"
            width={40}
            height={40}
          />
        </a>
        <a href="#">
          <img
            src="/images/social-media/youtube.svg"
            className="icon"
            alt="youtube"
            width={40}
            height={40}
          />
        </a>
      </div>
    </div>

    <hr />

    <div className="footer-main">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-4 col-lg header-column">
            <h3>Cities</h3>
            <div className="list">
              <Link href="#">
                <a>Amsterdam</a>
              </Link>
              <Link href="#">
                <a>Den Haag</a>
              </Link>
              <Link href="#">
                <a>Rotterdam</a>
              </Link>
              <Link href="#">
                <a>Eindhoven</a>
              </Link>
              <Link href="#">
                <a>Utrecht</a>
              </Link>
              <Link href="#">
                <a>Arnhem</a>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg header-column">
            <h3>Digi Rent</h3>
            <div className="list">
              <Link href="/about">
                <a>About Us</a>
              </Link>
              <Link href="/media">
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
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg header-column">
            <h3>Tenants</h3>
            <div className="list">
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
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg header-column">
            <h3>Landlords</h3>
            <div className="list">
              <Link href="#">
                <a>How to rent out</a>
              </Link>
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>
              <Link href={`/rental-tips#${userTypes.LANDLORD}`}>
                <a>Rental Tips</a>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg header-column">
            <h3>Support</h3>
            <div className="list">
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
        </div>
      </div>
    </div>

    <hr />

    <p className="copyright">Copyright 2020. All rights reserved</p>
  </footer>
);

export default index;
