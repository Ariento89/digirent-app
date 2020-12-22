import Select from 'components/Select/index';
import ToggleSwitch from 'components/ToggleSwitch/index';
import { useState } from 'react';

const languageOptions = [
  { name: 'Language 1', value: 1 },
  { name: 'Language 2', value: 2 },
  { name: 'Language 3', value: 3 },
  { name: 'Language 4', value: 4 },
];

const toggleSwitchOptions = {
  ON: 'on',
  OFF: 'off',
};

const AccountProfile = () => {
  const [language, setLanguage] = useState(null);

  const [toggle1, setToggle1] = useState(toggleSwitchOptions.ON);
  const [toggle2, setToggle2] = useState(toggleSwitchOptions.ON);
  const [toggle3, setToggle3] = useState(toggleSwitchOptions.OFF);

  return (
    <>
      <div className="user-profile main-box p-0">
        <div className="top">
          <div className="premium">
            <img src="/images/icon/icon-diamond-white.svg" className="icon" alt="icon" />
            <span className="divider" />
            <span className="text">PREMIUM</span>
          </div>
          <div className="photo-holder">
            <div className="settings">
              <div className="item">
                <span>B</span>
              </div>
              <div className="item">
                <img src="/images/icon/icon-camera-primary.svg" alt="camera icon" />
              </div>
              <div className="item">
                <img src="/images/icon/icon-facebook-f-primary.svg" alt="fb f icon" />
              </div>
              <div className="item">
                <span>ID</span>
              </div>
            </div>
            <div className="status-banner">
              ALL <span className="font-weight-bold">OK</span>
            </div>
            <div className="change-photo">
              <img src="/images/icon/icon-camera-white.svg" alt="camera icon" />
            </div>
            <img
              className="photo-additional-bg"
              src="/images/account-profile-bg.svg"
              alt="bg profile"
            />
          </div>
        </div>

        <div className="bottom mt-1">
          <h3 className="name text-center text-md font-weight-bold">Tim Burton</h3>
          <span className="main-description text-dark-gray text-center d-block">
            Speaks Duthch, English
          </span>

          <div className="progress-wrapper mt-4">
            <span className="main-description text-center d-block text-primary">
              Completed profile: <span className="font-weight-bold">80%</span>
            </span>
            <div className="progress">
              <div className="progress-bar w-75" role="progressbar">
                <span className="progress-point" />
              </div>
            </div>
          </div>

          <button type="button" className="button yellow mx-auto d-block mt-5">
            CANCEL <span className="font-weight-bold">PREMIUM</span>
          </button>
        </div>
      </div>

      <div className="settings-wrapper my-5">
        <button type="button" className="button btn-icon-text d-flex">
          <img src="/images/icon/icon-settings-white.svg" alt="icon" />
          <span className="divider" />
          <span className="text">Settings</span>
        </button>

        <Select
          classNames="mt-3"
          value={language}
          onChange={(value) => setLanguage(value)}
          options={languageOptions}
          placeholder="Language"
          icon="icon-languages-primary"
        />

        <div className="mt-4">
          <div className="language-item mx-auto">
            <span className="circle" />
            <span className="text">English</span>
          </div>

          <div className="language-item mt-2 mx-auto">
            <span className="circle" />
            <span className="text">Dutch</span>
          </div>
        </div>
      </div>

      <div className="toggle-buttons main-box">
        <ToggleSwitch
          name="toggle-1"
          label="Email messages notifications"
          onValue={toggleSwitchOptions.ON}
          offValue={toggleSwitchOptions.OFF}
          value={toggle1}
          onChange={setToggle1}
        />

        <hr />

        <ToggleSwitch
          name="toggle-2"
          label="Monthly newsletter"
          onValue={toggleSwitchOptions.ON}
          offValue={toggleSwitchOptions.OFF}
          value={toggle2}
          onChange={setToggle2}
        />

        <hr />

        <ToggleSwitch
          name="toggle-3"
          label="Weekly update new tenants"
          onValue={toggleSwitchOptions.ON}
          offValue={toggleSwitchOptions.OFF}
          value={toggle3}
          onChange={setToggle3}
        />
      </div>
    </>
  );
};

export default AccountProfile;
