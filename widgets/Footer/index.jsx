/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { userTypes } from 'shared/types';

const Footer = () => (
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
              <a
                onClick={() => {
                  window.location.href="/properties?label=Amsterdam%2C+Netherlands&from=&to=&lat=52.3675734&lng=4.9041389"
                }}
                style={{cursor: "pointer"}}
              >Amsterdam
              </a>
              <a
                onClick={() => {
                  window.location.href="/properties?label=Den+Haag%2C+Netherlands&from=&to=&lat=52.0704978&lng=4.3006999"
                }}
                style={{cursor: "pointer"}}
              >Den Haag
              </a>
              <a
                onClick={() => {
                  window.location.href="/properties?label=Rotterdam%2C+Netherlands&from=&to=&lat=51.9244201&lng=4.4777325"
                }}
                style={{cursor: "pointer"}}
              >Rotterdam
              </a>
              <a
                onClick={() => {
                  window.location.href="/properties?label=Eindhoven%2C+Netherlands&from=&to=&lat=51.44164199999999&lng=5.4697225"
                }}
                style={{cursor: "pointer"}}
              >Eindhoven
              </a>
              <a
                onClick={() => {
                  window.location.href="/properties?label=Utrecht%2C+Netherlands&from=&to=&lat=52.09073739999999&lng=5.1214201"
                }}
                style={{cursor: "pointer"}}
              >Utrecht
              </a>
              <a
                onClick={() => {
                  window.location.href="/properties?label=Arnhem%2C+Netherlands&from=&to=&lat=51.9851034&lng=5.898729599999999"
                }}
                style={{cursor: "pointer"}}
              >Arnhem
              </a>
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
              <Link href="/#for-tenants">
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
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg header-column">
            <h3>Landlords</h3>
            <div className="list">
              <Link href="/#for-landlords">
                <a>How to rent out</a>
              </Link>
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>
              <Link href={`/rental-tips#${userTypes.LANDLORD}`}>
                <a>Rental Tips</a>
              </Link>
              <Link href="/blog">
                <a>Blog</a>
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

export default Footer;
