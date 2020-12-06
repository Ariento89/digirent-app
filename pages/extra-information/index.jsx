import { useState } from 'react';
import PageWrapper from 'widgets/PageWrapper';
import cn from 'classnames';

const cookieType = {
  DEFAULT: 'DEFAULT',
  FUNCTIONAL: 'FUNCTIONAL',
  REQUIRED: 'REQUIRED',
};

const Page = () => {
  const [selectedCookie, setSelectedCookie] = useState(cookieType.DEFAULT);

  return (
    <PageWrapper title="DigiRent - Extra Information" pageName="extra-information">
      <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
      <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
      <div className="container" style={{ position: 'relative' }}>
        <h3 className="main-title" id="terms-and-condition">
          EXTRA INFORMATION
        </h3>
        <p className="main-desc text-center mt-5">
          We would like to inform you regarding our Cookies, Terms of Use, Privacy Statement and our
          Data Security measures.
        </p>

        <div className="download-buttons mt-5">
          <button type="button" className="button btn-icon-text">
            <img src="/images/icon/icon-download-white.svg" alt="download icon" />
            <span className="divider" />
            <span className="text">
              DOWNLOAD OUR <span className="font-weight-bold">TERMS OF USE</span>
            </span>
          </button>

          <button type="button" className="button btn-icon-text">
            <img src="/images/icon/icon-download-white.svg" alt="download icon" />
            <span className="divider" />
            <span className="text">
              DOWNLOAD OUR <span className="font-weight-bold">PRIVACY STATEMENT</span>
            </span>
          </button>
        </div>

        <div className="cookies" id="cookies">
          <h3 className="main-title-2">COOKIES</h3>

          <div className="main-box mt-5">
            <p className="main-desc text-primary font-weight-bold d-block">
              ABOUT COOKIES ON THIS SITE
            </p>
            <p className="main-desc">
              When using this website, <span className="text-primary">Digi Rent</span> uses cookies
              and other tracking technologies &quot;Cookies&quot;. In addition to Cookies which are
              necessary for the proper functioning of its website, subject to your preferences,
              <span className="text-primary"> Digi Rent</span> may also use Cookies to analyze and
              optimize the website functionality and o deliver conent tailored to your interests.
            </p>
          </div>

          <div className="settings mt-5">
            <div
              className={cn('item mt-3', { active: selectedCookie === cookieType.DEFAULT })}
              onClick={() => setSelectedCookie(cookieType.DEFAULT)}
            >
              <div className="radio-button-setting">
                <div className="icon-circle" />
              </div>
              <div className="main-box">
                <p className="main-desc">
                  <span className="text-primary">ACCEPT DEFAULT</span> will keep your preferences
                  set to &quot;Personalization&quot;.
                </p>
              </div>
            </div>

            <div
              className={cn('item mt-3', { active: selectedCookie === cookieType.FUNCTIONAL })}
              onClick={() => setSelectedCookie(cookieType.FUNCTIONAL)}
            >
              <div className="radio-button-setting">
                <div className="icon-circle" />
              </div>
              <div className="main-box">
                <p className="main-desc">
                  <span className="text-primary">&quot;FUNCTIONAL&quot; COOKIES</span> and enables
                  <span className="text-primary"> Digi Rent </span> and its authorized partners to
                  collect statistics and to collectt and use Cookie data to provide you a
                  personalized web experience and more relevant ads on third party websites.
                </p>
              </div>
            </div>

            <div
              className={cn('item mt-3', { active: selectedCookie === cookieType.REQUIRED })}
              onClick={() => setSelectedCookie(cookieType.REQUIRED)}
            >
              <div className="radio-button-setting">
                <div className="icon-circle" />
              </div>
              <div className="main-box">
                <p className="main-desc">
                  <span className="text-primary d-block">PROCEED WITH REQUIRED COOKIES</span> Only
                  will set your Cookies preferences to &quot;Required&quot; and will preventt
                  <span className="text-primary"> Digi Rent </span> and its parttners from
                  collecting and using Cookie data to collect statistics and to provide you a
                  personalized web experience and more relevant ads on third party websites.
                </p>
              </div>
            </div>

            <button type="button" className="button min-width d-block mx-auto mt-4">
              SAVE
            </button>

            <div className="main-box mt-5">
              <p className="main-desc">
                Cookies Preferences will provide further information and allow you to customize your
                Cookie settings. To provide a smooth navigation, your Cookies preferences will be
                shared across the <span className="text-primary">Digi Rent</span> web domains where
                the purpose and use of the Cookies will remain tthe same.
              </p>
            </div>
          </div>
        </div>

        <div className="data-security" id="data-security">
          <h3 className="main-title-2">DATA SECURITY</h3>

          <div className="main-box mt-5">
            <p className="main-desc text-primary font-weight-bold d-block">WHY DATA SECURITY?</p>
            <p className="main-desc">
              Organizations around the globe are investing heavily in Information Technology (IT)
              cyber security capabilities to protect their critical assets. So are we! With our 2
              ways encrypted database, we make sure that all information is secured and well
              documented and not reachable by anyone else but you. We have different set of controls
              for critical infrastructure, this means for incident detection and response to
              protecting all of our clients&apos; interests.
            </p>
          </div>

          <div className="main-box mt-3">
            <p className="main-desc text-primary font-weight-bold d-block">
              DATA SECURITY SOLUTIONS
            </p>
            <p className="main-desc">
              With advanced data encryption, verification, and key management to assure you that
              your Data is protected across applications. transactions, storage, and our platform.
              <span className="text-primary"> Digi Rent</span> simplifies the protection of
              sensitive data in even the most complex use cases.
            </p>
          </div>

          <div className="main-box mt-3 using">
            <p className="main-desc text-primary font-weight-bold d-block">USING:</p>
            <ul>
              <li>
                <p className="main-desc">
                  <span className="text-primary">Clour data security</span> — Protection platform
                  that allows us to move to the cloud securely while protecting data in cloud
                  applications.
                </p>
              </li>
              <li>
                <p className="main-desc">
                  <span className="text-primary">Data encryption</span> — Data-centric and
                  tokenization security solutions that prottect data across enterprise, cloud,
                  mobile and big data environments.
                  <span className="d-block mt-4">
                    So be assured that your information is safe with us!
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
