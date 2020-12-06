import PageWrapper from 'widgets/PageWrapper';

const Page = () => (
  <PageWrapper title="DigiRent - Pricing" pageName="pricing">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container">
      <h3 className="main-title">PRICING</h3>
      <p className="main-desc text-center mt-5">
        In terms of pricing we offer 2 packages for the Landlords. You can always publish your house
        and have 24/7 customer service. As service is the most important thing which
        <span className="text-primary"> Digi Rent</span> strives for. Below you will find the
        packages which will suit you best.
      </p>

      <div className="pricing">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="item item-free">
              <div className="price">
                <span className="title">FREE</span>
                <img className="background" src="/images/pricing-free-bg.svg" alt="background" />
              </div>
              <div className="features mt-3">
                <div className="overlay">
                  <div className="background" />
                  <span className="title">FREE</span>
                  <div className="button-wrapper">
                    <button type="button" className="button">
                      GET STARTED
                    </button>
                  </div>
                </div>
                <ul>
                  <li>
                    <p className="main-desc">Unlimited publishing house(s)</p>
                  </li>
                  <li>
                    <p className="main-desc">No approaching tenants</p>
                  </li>
                  <li>
                    <p className="main-desc">Only chat with tenant when applied</p>
                  </li>
                  <li>
                    <p className="main-desc">24/7 customer service</p>
                  </li>
                  <li>
                    <p className="main-desc line-through">Social media campaign</p>
                  </li>
                  <li>
                    <p className="main-desc line-through">E-signing contracts</p>
                  </li>
                  <li>
                    <p className="main-desc line-through">Receive rental income online</p>
                  </li>
                </ul>
              </div>
              <div className="get-started mt-3">
                <div className="background" />
                <span className="title">FREE</span>
                <div className="button-wrapper">
                  <button type="button" className="button">
                    GET STARTED
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="item item-premium">
              <div className="price">
                <div className="title-icon">
                  <img
                    className="icon-premium mx-auto d-block"
                    src="/images/icon/icon-diamond-white.svg"
                    alt="diamond icon"
                  />
                  <span className="title">PREMIUM</span>
                </div>
                <img className="background" src="/images/pricing-premium-bg.svg" alt="background" />
              </div>
              <div className="features mt-3">
                <div className="overlay">
                  <div className="background" />
                  <span className="title">
                    € 39
                    <span className="subtitle">PER MONTH</span>
                  </span>

                  <div className="button-wrapper">
                    <button type="button" className="button yellow">
                      GET STARTED
                    </button>
                  </div>
                </div>
                <ul>
                  <li>
                    <p className="main-desc">Unlimited publishing house(s)</p>
                  </li>
                  <li>
                    <p className="main-desc">No approaching tenants</p>
                  </li>
                  <li>
                    <p className="main-desc">Only chat with tenant when applied</p>
                  </li>
                  <li>
                    <p className="main-desc">24/7 customer service</p>
                  </li>
                  <li>
                    <p className="main-desc line-through">Social media campaign</p>
                  </li>
                  <li>
                    <p className="main-desc line-through">E-signing contracts</p>
                  </li>
                  <li>
                    <p className="main-desc line-through">Receive rental income online</p>
                  </li>
                </ul>
              </div>

              <div className="get-started mt-3">
                <div className="background" />
                <span className="title">
                  € 39
                  <span className="subtitle">PER MONTH</span>
                </span>

                <div className="button-wrapper">
                  <button type="button" className="button yellow">
                    GET STARTED
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="more-info">
        <p className="main-desc text-center">
          When you choose a Premium Account, the first payment is made via iDEAL or PayPal. You
          hereby issue a continuous direct debit mandate. After issuing this revolving direct debit
          mandate, the first subscription period starts. The subscription costs are collected
          monthly. The &quot;Distance Selling Act&quot; applies to all our services. Read more about
          it here.
        </p>

        <p className="main-desc mt-4 text-center">
          Don&apos;t want an automatic renewal? Then make sure you cancel at least 30 days before
          the start of the new subscription period. You can cancel your Premium Account via the
          &quot;Change&quot; button via the &quot;My account&quot; page in your Rental sector
          account. If you cancel on the same day that the Premium account is ordered, there is no
          notice period.
        </p>
      </div>
    </div>
  </PageWrapper>
);

export default Page;
