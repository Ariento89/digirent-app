import PageWrapper from 'widgets/PageWrapper';

const Page = () => (
  <PageWrapper
    title="DigiRent - International Students Expats"
    pageName="international-students-expats"
  >
    <img src="/images/main-left-airplane-bg.png" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container">
      <h3 className="main-title">INTERNATIONAL STUDENTS & EXPATS</h3>

      <p className="main-desc dark-gray text-center mt-5">
        We understand that the journey that you are taking as an International Student or as an
        Expat is one with lots of information. We&apos;ve made a simple breakdown so you can easily
        understand what your next steps should be to consider while working towards your trip to the
        Netherlands. Always use
        <a
          href="https://www.belastingdienst.nl"
          target="_blank"
          rel="noreferrer"
          className="text-primary"
        >
          {' '}
          www.belastingdienst.nl{' '}
        </a>
        and
        <a href="https://www.ind.nl" target="_blank" rel="noreferrer" className="text-primary">
          {' '}
          www.ind.nl{' '}
        </a>
        for more information.
      </p>

      <div className="information">
        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-house-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              It’s time to go! So pack up your stuff. Pack everything that you will need in the days
              between packing and arriving in The Netherlands into suitcases first. Then pack the
              rest in boxes. Make sure your temp housing in The Netherlands is arranged and you have
              arranged a key handover
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-copy-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              Make sure you have all your official documents, e.g. passports, birth and marriage
              certificates with you. Do not place them in boxes or your suitcase. Photocopy the
              documents and place them in the <span className="text-primary">Digi Rent</span> secure
              vault.
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-graduation-cap-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              If you are moving over with children, make sure to start looking for schools in your
              desired living area early on. Schools tend to fill up quickly, and it is not uncommon
              to be placed on a waiting list before summer has even started.
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-house-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              Welcome to The Netherlands! Once you have found your new home with
              <span className="text-primary"> Digi Rent </span> you will arrange a check-in.
              <span className="text-primary"> Digi Rent</span> has a diplomatic clause standard in
              the contract and will make sure all documents like rental contracts and check-in
              reports are stored in the <span className="text-primary">Digi Rent</span> secure
              vault.
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-buildings-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              Time to get to know your way around town! The
              <span className="text-primary"> Digi Rent</span> community is a great place to start.
              Make sure to find a doctor and dentist and subscribe to your utilities and media
              connections. Tip: check the use of your utilities on a 6-month basis as the fee is
              only an estimated amount.
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-user-switch-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              Register with your local municipality and pick up your residence and work permit.
              Expat Centers usually combine the two appointments. At this point you will be given
              your BSN. Make sure to hold onto it, you will use this number often. Open a bank
              account to facilitate transfer of funds.
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-wallet-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              Keep track of your days if you are spending working days outside of the Netherlands.
              Speak to your HR if you go over 30 days. This may have an effect in your taxes and
              possibly also on your rights of stay if you go over a certain threshold.
            </p>
          </div>
        </div>

        <div className="item mt-3">
          <div className="rounded-icon not-responsive">
            <img src="/images/icon/icon-security-primary.svg" alt="item icon" />
          </div>
          <div className="main-box">
            <p className="main-desc">
              Should you have an employment contract in The Netherlands as well as your payroll, and
              live here, but also have a home (and family) abroad, make sure to not spend more than
              25% of your time in your home abroad. If you do you may no longer be socially secured
              in The Netherlands.
            </p>
          </div>
        </div>

        <button type="button" className="button btn-icon-text mt-5 mx-auto">
          <img src="/images/icon/icon-download-white.svg" alt="icon" />
          <span className="divider" />
          <span className="text">
            DOWNLOAD <span className="font-weight-bold">PDF</span> FILE
          </span>
        </button>
      </div>
    </div>
  </PageWrapper>
);

export default Page;
