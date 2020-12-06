import cn from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PageWrapper from 'widgets/PageWrapper';

const data = [
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 2 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 2 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
];

const Page = () => (
  <PageWrapper title="DigiRent - Messages" pageName="messages">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container-fluid container-lg">
      <h3 className="main-title">MESSAGES</h3>
      <div className="row mt-5">
        <div className="col-12 col-lg-4">
          <div className="search-bar">
            <img src="/images/icon/icon-search-primary.svg" alt="search icon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="position-relative d-flex align-items-center">
            <div className="message-icon">
              <img src="/images/icon/icon-user-white.svg" alt="user icon" />
            </div>

            <div className="user-messages main-box" id="user-messages">
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                {data.map((item, index) => (
                  <div className={cn('item', { 'mt-3': index !== 0 })}>
                    <div className="user-photo" />
                    <div className="information">
                      <div className="name-date">
                        <p className="name">{item.name}</p>
                        <div className="date-wrapper">
                          <p className="time">01:10pm</p>
                          {item.count > 0 && <p className="messages-count">{item.count}</p>}
                        </div>
                      </div>
                      <p className="message main-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-7 col-xl-8 mt-5 mt-lg-0">
          <div className="user-header">
            <div className="user-photo" />
            <div className="user-info">
              <p className="name">Jennifer</p>
              <p className="role">STUDENT</p>
            </div>
            <button type="button" className="button btn-send-booking-request">
              SEND <span className="font-weight-bold"> BOOKING REQUEST </span>
            </button>
          </div>

          <div className="main-message mt-3">
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              <div className="content" id="main-message-content">
                <p className="message person">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message you">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message person">Your house is amazing.</p>
                <p className="message person">Your house is amazing.</p>
                <p className="message you">Your house is amazing.</p>
                <p className="message person">Ok.</p>

                <p className="message person">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <p className="message you">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message person">Your house is amazing.</p>
                <p className="message person">Your house is amazing.</p>
                <p className="message you">Your house is amazing.</p>
                <p className="message person">Ok.</p>

                <p className="message person">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message you">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message person">Your house is amazing.</p>
                <p className="message person">Your house is amazing.</p>
                <p className="message you">Your house is amazing.</p>
                <p className="message person">Ok.</p>

                <p className="message person">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message you">
                  Your house is amazing. Every window is an embodiment of art.
                </p>
                <p className="message person">Your house is amazing.</p>
                <p className="message person">Your house is amazing.</p>
                <p className="message you">Your house is amazing.</p>
                <p className="message person">Ok.</p>
              </div>
            </PerfectScrollbar>
            <div className="footer">
              <textarea placeholder="Message" />
              <button className="button">
                <img src="/images/icon/icon-email-outline.svg" alt="email icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
);

export default Page;
