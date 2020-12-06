/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Badge from 'components/Badge/index';
import Checkbox from 'components/Checkbox/index';
import FileUpload from 'components/FileUpload/index';
import Input from 'components/Input/index';
import { NextArrow, PrevArrow } from 'components/SlickArrows';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Slider from 'react-slick';
import PageWrapper from 'widgets/PageWrapper';
import { SocialMedias, socialMediaDirection } from 'widgets/SocialMedias';

const benefits = [
  {
    title: 'Growth',
    description:
      'We empower you to increase your knowledge, build your skills and take charge of your career through tuition reimbursement, as well as an internal speakers series and classes, ranging from coding 101 to public speaking and more.',
    icon: 'icon-chart-primary',
  },
  {
    title: 'Convenience',
    description:
      'We offer commuter subsidies, transportation support and central office locations.',
    icon: 'icon-happiness-primary',
  },
  {
    title: 'Time Away',
    description:
      'Our time off policies encourage employees to replenish their energy when they need it. Additionally, our “Reboot & Recharge” program offers long-tenured employees up to six weeks of time away from work after six consecutive years of employment.',
    icon: 'icon-clock-primary',
  },
  {
    title: 'Benefit Sample 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: 'icon-chart-primary',
  },
  {
    title: 'Benefit Sample 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: 'icon-chart-primary',
  },
];

const slickSettings = {
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
};

const Page = () => {
  const [applicationFormModalVisible, setApplicationFormModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const onShowApplicationForm = () => setApplicationFormModalVisible(true);
  const onCloseApplicationForm = () => setApplicationFormModalVisible(false);

  const onShowRole = () => setRoleModalVisible(true);
  const onCloseRole = () => setRoleModalVisible(false);

  return (
    <>
      <PageWrapper title="DigiRent - Careers" pageName="careers">
        <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
        <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />

        <div className="landing">
          <div className="content">
            <div className="title">COMMITED</div>
            <div className="subtitle">
              <span className="alt">TO</span>EXCELLENCE
            </div>
          </div>

          <div className="scroll-down">
            <div className="white-space" />
            <div className="scroll-down-wrapper">
              <img
                src="/images/scroll-down-space.svg"
                className="scroll-down-space"
                alt="icon space"
              />
              <img
                src="/images/icon/icon-caret-down-white.svg"
                className="scroll-down"
                alt="icon"
              />
            </div>
            <div className="white-space" />
          </div>
        </div>

        <div className="container">
          <div className="main-info main-box radius-30 p-md-4 p-lg-5">
            <p className="main-desc text-center dark-gray2">
              At <span className="text-primary">Digi Rent</span>, we acknowledge and value our
              differences as well as our combined strengths. We want all employees, regardless of
              their background, to feel respected personally and professionally. We cultivate a
              working environment that inspires new ideas, promotes ownership and experimentation,
              and supports highly-motivated individuals to be truly creative.
            </p>

            <p className="main-desc mt-2 text-center dark-gray2">
              Do you want to help move the rental industry from taboo to transparent? Are you
              bright, tenacious, and inventive? Working at{' '}
              <span className="text-primary">Digi Rent</span> means feeling empowered to make a
              difference and inspired to bring innovation to the Rental business. We’re transforming
              the rental industry and are looking to bring on talented professionals with varied
              perspectives like you.
            </p>

            <p className="main-desc text-center dark-gray2">
              If so, <span className="text-primary">Digi Rent</span> may be the perfect place for
              you to grow your career!
            </p>

            <div className="icon rounded-icon not-responsive">
              <img src="/images/icon/icon-buildings-primary.svg" alt="item icon" />
            </div>
          </div>

          <div className="positions">
            <p className="main-title">
              OPEN <span className="text-primary font-weight-bold">POSITIONS</span>
            </p>
            <p className="main-desc subtitle mx-auto mt-3 text-center">
              And inspirational and fun working environment which breathes innovation. There is
              space enough for your own projects within{' '}
              <span className="text-primary">Digi Rent</span>. Something we look forward to.
            </p>

            <div className="mt-5">
              {[1, 2, 3, 4, 5].map((key) => (
                <div key={key} className="item">
                  <div className="column-1">
                    <p
                      className="main-desc font-weight-bold text-dark role-name"
                      onClick={onShowRole}
                    >
                      Customer Success Manager
                    </p>
                  </div>
                  <div className="column-2">
                    <p className="main-desc text-center">New York</p>
                  </div>
                  <div className="column-3">
                    <p className="main-desc text-center">Customer Success</p>
                  </div>
                  <div className="column-4" onClick={onShowApplicationForm}>
                    <button className="button">APPLY</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container max-width benefits">
          <p className="main-title">
            STANDARDS <span className="text-primary font-weight-bold">BENEFITS</span>
          </p>

          <Slider {...slickSettings} className="list">
            {benefits.map(({ title, description, icon }) => (
              <div className="item">
                <div className="rounded-icon icon not-responsive mx-auto">
                  <img src={`/images/icon/${icon}.svg`} alt="item icon" />
                </div>

                <div className="outer-circle">
                  <div className="position-wrapper">
                    <div className="inner-circle">
                      <p className="title text-center">{title}</p>
                      <p className="main-desc text-center">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </PageWrapper>

      <Modal
        id="role-modal"
        dialogClassName="modal-xl"
        show={roleModalVisible}
        onHide={onCloseRole}
        centered
      >
        <Modal.Body>
          <div className="main-content">
            <div className="header">
              <div className="role-information">
                <p className="main-desc font-weight-bold text-dark">Customer Success Manager</p>

                <div className="badges mt-1">
                  <Badge label="New York" classNames="mr-2 mt-1" />
                  <Badge label="Customer Success" classNames="mr-2 mt-1" />
                  <Badge label="Full Time" classNames="mt-1" />
                </div>
              </div>
              <div className="controls">
                <button className="button min-width btn-apply">APPLY</button>
                <SocialMedias direction={socialMediaDirection.RIGHT} />
              </div>
            </div>

            <PerfectScrollbar options={{ wheelPropagation: false }}>
              <div className="job-description mt-4">
                <p className="main-desc dark-gray2">
                  Celtra is hiring for a Customer Success Manager to assist and grow our enterprise,
                  tech platform and publisher business channels. In this role you will work with
                  clients from all sectors and across industries, and you will be responsible for
                  owning all stages of the customer lifecycle including onboarding, adoption, and
                  renewals. As a CSM you will define and demonstrate how Celtra’s Creative
                  Automation (CA) and Creative Enablement (CE) products can solve for
                  enterprise-grade creative production and dynamic marketing challenges across
                  digital advertising.
                </p>
                <p className="main-desc dark-gray2 mt-4">
                  Reporting to the Director of Customer Success, this role will partner closely with
                  the rest of the Customer Success team including the Solutions and Support team as
                  well as Product and Engineering. You will begin by supporting the Director of
                  Customer Success with enterprise-level clients, while over time taking on and
                  managing your own book of business.
                </p>
                <p className="main-desc dark-gray2 mt-4">
                  You will act as a trusted advisor to customers and internal teams alike,
                  organising and distilling Celtra knowledge in a format customers can replicate it.
                  You will also act as a key conduit between your clients and our engineers and
                  product teams to help shape the future of product innovation. You will need to
                  demonstrate a deep understanding of your clients’ needs, while working
                  consultatively to build relationships that deliver value on both sides. A fast
                  learner with an entrepreneurial mindset, who is excited to work in a fast-paced
                  environment where their decisions can make a significant impact will excel in this
                  role. This is a client-facing role and requires high-quality human interaction
                  skills as well as polished written English communication. This role is based in
                  the NA region and may require travel.
                </p>

                <div className="responsibilities mt-4">
                  <p className="main-desc font-weight-bold">Responsibilities</p>
                  <ul className="mt-2">
                    <li>
                      <p className="main-desc dark-gray2">
                        Develop customer relationships enabling platform adoption and growth
                        ensuring customers achieve full business value.
                      </p>
                    </li>
                    <li>
                      <p className="main-desc dark-gray2">
                        Partner with the internal Celtra team members (Product Management,
                        Engineering, Solutions) to align the company’s activities with the
                        customer's business case and strategy. Advocate on behalf of the customer
                        and collect feedback to drive continuous improvement across all areas
                        including product
                      </p>
                    </li>
                    <li>
                      <p className="main-desc dark-gray2">
                        Monitor and identify adoption and utilization trends, provide
                        recommendations based on risk and customers’ needs. Own and manage customer
                        escalation situations at Senior level.
                      </p>
                    </li>
                    <li>
                      <p className="main-desc dark-gray2">
                        Help clients to establish new workflows & institute behavioral changes (old
                        way vs new way) in collaboration with solution consultants
                      </p>
                    </li>
                    <li>
                      <p className="main-desc dark-gray2">
                        Maintain a strong knowledge of Celtra products and value proposition for
                        enterprise, publishers, and platforms
                      </p>
                    </li>
                    <li>
                      <p className="main-desc dark-gray2">
                        Provide feedback to the organisation on general client demands and
                        identified gaps in capabilities.
                      </p>
                    </li>
                    <li>
                      <p className="main-desc dark-gray2">
                        Proactively anticipate opportunities to expand or improve Celtra product
                        offerings; identify deficiencies & technical issues with a potential
                        negative impact on customer expectations and delivery.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="application-form-modal"
        show={applicationFormModalVisible}
        onHide={onCloseApplicationForm}
        centered
      >
        <Modal.Body>
          <div className="modal-background" />
          <button
            type="button"
            className="button-nav primary s-40"
            onClick={onCloseApplicationForm}
          >
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content">
            <div className="rounded-icon mx-auto">
              <img src="/images/icon/icon-email-primary.svg" alt="item icon" />
            </div>

            <span className="main-title mt-4 d-block font-weight-bold text-center">
              APPLICATION FORM
            </span>

            <div className="form-fields mx-auto mt-2 px-4">
              <div className="row">
                <div className="col-md-6 mt-3 mt-md-4">
                  <Input placeholder="First Name" icon="icon-text-primary" />
                </div>
                <div className="col-md-6 mt-3 mt-md-4">
                  <Input placeholder="Last Name" icon="icon-text-primary" />
                </div>
                <div className="col-md-6 mt-3 mt-md-4">
                  <Input placeholder="Email Address" icon="icon-email-primary" />
                </div>
                <div className="col-md-6 mt-3 mt-md-4">
                  <Input placeholder="Phone Number" icon="icon-smartphone-primary" />
                </div>

                <div className="col-12 mt-3 mt-md-4">
                  <Input placeholder="Link your LinkedIn account" icon="icon-link-primary" />
                </div>

                <div className="col-12 mt-3 mt-md-4">
                  <Input
                    placeholder="Online Portfolio (Behance, Github, etc.)"
                    icon="icon-link-primary"
                  />
                </div>
              </div>

              <FileUpload classNames="mt-3 mt-md-4" />

              <Checkbox
                value={privacyPolicyChecked}
                onChange={(value) => setPrivacyPolicyChecked(value)}
                classNames="mt-3 mt-md-4"
                label="I agree to the Candidate Privacy Policy (link in the job description)"
              />

              <button type="button" className="button d-block mt-4 mt-lg-5 mx-auto">
                <span className="font-weight-bold">SUBMIT</span> APPLICATION
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
