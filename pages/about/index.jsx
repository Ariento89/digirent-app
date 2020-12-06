import Link from 'next/link';
import PageWrapper from 'widgets/PageWrapper';

const Page = () => (
  <PageWrapper title="DigiRent - About Us" pageName="about">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container">
      <div className="about-us-wrapper">
        <h3 className="main-title">ABOUT US</h3>

        <div className="main-box">
          <div className="about-us-item">
            <img
              src="/images/icon/icon-radio-button-primary.svg"
              className="radio-button-icon"
              alt="icon"
            />
            <p className="main-desc">
              <span className="text-primary">Digi Rent</span> is built on innovation. When we
              started, we boosted the Dutch Rental platforms industry by introducing safer
              transactions in an unclear market. We offer an easier, transparent, cheaper and more
              flexible way than what the bulky, conventional market could deliver. We are still
              boosting innovation and are still working hard to make the rental market transparent
              than ever before by using digitalization as a form to bring down cost for all parties.
              Why don&apos;t use technology where it&apos;s intended for, to make our life easier
              and with less costs!
            </p>
          </div>
        </div>

        <div className="main-box">
          <div className="about-us-item">
            <img
              src="/images/icon/icon-radio-button-primary.svg"
              className="radio-button-icon"
              alt="icon"
            />
            <p className="main-desc">
              That would never be possible without our great team. We are actively building a team
              of curious individuals. All our employees share an enormous passion for the latest
              technologies and products. And we make sure they have the opportunity to work with it,
              so they have the freedom to optimize their workflows, operate at the pinnacle of
              technology and, ultimately, build the future of the rental business.
            </p>
          </div>
        </div>
      </div>

      <div className="help-build-the-future-wrapper">
        <h3 className="main-title">HELP BUILD THE FUTURE</h3>

        <div className="main-box">
          <p className="main-desc text-center">
            <span className="text-primary">Digi Rent</span> is always looking for new talent for our
            team. We are looking for curious individuals with good ideas and strong opinions who,
            very importantly, can create cool products and help us with our future endeavors.
          </p>
        </div>

        <div className="rounded-icon not-responsive">
          <img src="/images/icon/icon-puzzle-primary.svg" alt="item icon" />
        </div>

        <Link href="/careers">
          <button type="button" className="button btn-view-all-vacancies">
            VIEW <span className="font-weight-bold">ALL VACANCIES</span>
          </button>
        </Link>
      </div>
    </div>
  </PageWrapper>
);

export default Page;
