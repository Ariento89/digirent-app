/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getDistance } from 'shared/functions';
import { userTypes } from 'shared/types';
import { UserSelect } from 'widgets/UserSelect';

const landlordData = {
  step1: {
    title: 'List your house online',
    description:
      'Upload your house and images and make sure that your house is seen by thousand tenants that are looking for the right space to live in. It’s never been easier to find so much screened tenants',
    src: '/images/steps-list-your-house-online.png',
  },
  step2: {
    title: 'Get in touch with tenants and match',
    description:
      'Our screened database will automatically connect you to the right tenants. You can send out messages if they already didn’t apply for your house as they will receive automatic messages. In a matter of seconds, you will know who your next tenant will be',
    src: '/images/steps-get-in-touch.png',
  },
  step3: {
    title: 'Sign documents online',
    description:
      'Get a signed legally binding document back without wasting time on coordinating a personal meeting. Digi Rent uses a secure sign service to provide you with a convenient online signing that will save you valuable time',
    src: '/images/steps-sign-docu-online.png',
  },
  step4: {
    title: 'Receive your payments digitally',
    description:
      'All international payment methods are accepted on our secured platform, where ever you or your tenant are based, you can collect your rent, deposit or any other fees. The first month’s rent is paid the moment your property is booked. It is fast, flexible and fully transparent',
    src: '/images/steps-money-online.png',
  },
};

const tenantData = {
  step1: {
    title: 'Sign Up',
    description:
      'Sign up or use our easy sign-in via Facebook or Gmail. Receive weekly updates with your preferences!',
    src: '/images/steps-sign-up.png',
  },
  step2: {
    title: 'Search and apply',
    description:
      'We have an extensive database where you can search for your perfect home. Apply directly and get a reply from the Landlord within 48 hours.',
    src: '/images/steps-search-and-apply.png',
  },
  step3: {
    title: 'Sign documents online',
    description:
      'Digi Rent uses a secure sign service to provide you with a convenient online signing that will save you valuable time. E-signature is a great substitute for signing papers by hand. ',
    src: '/images/steps-sign-docu-online.png',
  },
  step4: {
    title: 'Welcome to your new home',
    description: 'Plan your arrival with your Landlord and enjoy your new place to stay!',
    src: '/images/steps-welcome-to-your-new-home.png',
  },
};

const HowDoesItWork = ({ selectedUserType, setSelectedUserType }) => {
  const router = useRouter();
  const [data, setData] = useState(tenantData);

  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);
  const step4 = useRef(null);
  const divider1 = useRef(null);
  const divider2 = useRef(null);
  const divider3 = useRef(null);
  const divider4 = useRef(null);
  const line = useRef(null);

  // Effect: Update position of timeline divider
  useEffect(() => {
    if (step1.current && step2.current && step3.current && step4.current) {
      const boundingClient1 = step1.current?.getBoundingClientRect();
      const boundingClient2 = step2.current?.getBoundingClientRect();
      const boundingClient3 = step3.current?.getBoundingClientRect();
      const boundingClient4 = step4.current?.getBoundingClientRect();

      divider2.current.style.marginTop = `${getDistance(boundingClient1, boundingClient2)}px`;
      divider3.current.style.marginTop = `${getDistance(boundingClient2, boundingClient3)}px`;
      divider4.current.style.marginTop = `${getDistance(boundingClient3, boundingClient4)}px`;

      const distance = getDistance(boundingClient1, boundingClient4);
      const height = divider1.current.getBoundingClientRect().height + distance;
      line.current.style.height = `${height}px`;
    }
  }, [step1, step2, step3, step4, divider2, divider3, divider4, line, data]);

  const onSelectUserType = (userType) => {
    setSelectedUserType(userType);

    if (userType === userTypes.TENANT) {
      setData(tenantData);
    } else {
      setData(landlordData);
    }
  };

  // Effect: Get hash value
  useEffect(() => {
    const hashValue = router.asPath.split('#')?.[1];
    if (hashValue === 'for-landlords') {
      onSelectUserType(userTypes.LANDLORD);
    }

    if (hashValue === 'for-tenants') {
      onSelectUserType(userTypes.TENANT);
    }
  }, [router]);

  return (
    <div className="how-does-it-work container">
      <div id="for-landlords" />
      <div id="for-tenants" />
      <h3 className="main-title">
        HOW DOES IT <span className="text-primary font-weight-bold">WORK?</span>
      </h3>
      <p className="main-subtitle mt-2 mt-md-4 dark-gray">
        FIND YOUR NEW HOME <span className="font-weight-bold">4 EASY STEPS</span>
      </p>
      <p className="main-subtitle mt-1 mt-md-2 dark-gray">
        Find your ideal house and apply to your perfect home Digi Rent is fast, easy and safe!
      </p>

      <UserSelect
        classNames="homepage-user-select"
        selected={selectedUserType}
        onSelect={onSelectUserType}
      />

      <div className="steps">
        <div className="steps-left">
          <div className="item left">
            <span className="step-count" ref={step1}>
              1
            </span>
            <div className="rounded-icon not-responsive">
              <img src={data.step1.src} alt="item icon" />
            </div>
            <div className="main-box">
              <p className="main-desc font-weight-bold title">{data.step1.title}</p>
              <p className="main-desc">{data.step1.description}</p>
            </div>
          </div>

          <div className="item left space-top">
            <span className="step-count" ref={step3}>
              3
            </span>
            <div className="rounded-icon not-responsive">
              <img src={data.step3.src} alt="item icon" />
            </div>
            <div className="main-box">
              <p className="main-desc font-weight-bold title">{data.step3.title}</p>
              <p className="main-desc">{data.step3.description}</p>
            </div>
          </div>
        </div>

        <div className="steps-divider">
          <div className="circle" ref={divider1} />
          <div className="circle" ref={divider2} />
          <div className="circle" ref={divider3} />
          <div className="circle" ref={divider4} />
          <div className="line" ref={line} />
        </div>

        <div className="steps-right">
          <div className="item right space-top">
            <span className="step-count" ref={step2}>
              2
            </span>
            <div className="main-box">
              <p className="main-desc font-weight-bold title">{data.step2.title}</p>
              <p className="main-desc">{data.step2.description}</p>
            </div>
            <div className="rounded-icon not-responsive">
              <img src={data.step2.src} alt="item icon" />
            </div>
          </div>

          <div className="item right space-top">
            <span className="step-count" ref={step4}>
              4
            </span>
            <div className="main-box">
              <p className="main-desc font-weight-bold title">{data.step4.title}</p>
              <p className="main-desc">{data.step4.description}</p>
            </div>
            <div className="rounded-icon not-responsive">
              <img src={data.step4.src} alt="item icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="steps mobile">
        <div className="item">
          <span className="step-count">1</span>
          <div className="main-box">
            <p className="main-desc font-weight-bold title">{data.step1.title}</p>
            <p className="main-desc">{data.step1.description}</p>
          </div>
        </div>

        <div className="item">
          <span className="step-count">2</span>
          <div className="main-box">
            <p className="main-desc font-weight-bold title">{data.step2.title}</p>
            <p className="main-desc">{data.step2.description}</p>
          </div>
        </div>

        <div className="item">
          <span className="step-count">3</span>
          <div className="main-box">
            <p className="main-desc font-weight-bold title">{data.step3.title}</p>
            <p className="main-desc">{data.step3.description}</p>
          </div>
        </div>

        <div className="item">
          <span className="step-count">4</span>
          <div className="main-box">
            <p className="main-desc font-weight-bold title">{data.step4.title}</p>
            <p className="main-desc">{data.step4.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDoesItWork;
