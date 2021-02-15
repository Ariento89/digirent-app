/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import cn from 'classnames';
import ToggleSwitch from 'components/ToggleSwitch/index';
import { useAuthentication } from 'hooks/useAuthentication';
import { useLanguage } from 'hooks/useLanguage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useScrollData } from 'scroll-data-hook';
import { languageSwitchOptions, toastTypes } from 'shared/types';
import { API_ASSET_URL } from 'services/index';
import { useMe } from 'hooks/useMe';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import HomePageMenu from './HomePageMenu';

const SCROLL_THRESHOLD = 100;

const HomePageHeader = ({ onLoginClick, onRegisterClick }) => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [setUserImage] = useState(null);
  const { me } = useMe();
  // CUSTOM HOOKS
  const { position } = useScrollData();
  const { language, setLanguage } = useLanguage();
  const { addToast } = useToasts();
  const { accessToken, logout } = useAuthentication();

  // METHODS
  const onLogout = () => {
    addToast('Successfully logged out.', toastTypes.SUCCESS);
    logout();
  };

  useEffect(() => {
    if (me?.profileImageUrl) {
      setUserImage(`${API_ASSET_URL}${me.profileImageUrl}`);
    }
  }, [me]);

  return (
    <>
      <section className={cn('layout-homepage-header', { active: position.y >= SCROLL_THRESHOLD })}>
        <div className="header-logo">
          <Link href="/">
            <div className="logo">
              <h1 className="text">DIGI RENT</h1>
            </div>
          </Link>
        </div>

        <div className="header-menu">
          <div className="note">
            <span>FOR LANDLORDS</span>
          </div>

          {accessToken && !me?.emailVerified && (
            <div className="note" style={{ backgroundColor: 'red' }}>
              <span style={{ color: 'white' }}>Not Verified</span>
            </div>
          )}

          <div className="main-menu">
            <Link href="/properties">
              <p className="links">RENTALS</p>
            </Link>

            <div
              className={cn('information-container mx-3 mx-md-4', { active: isInformationVisible })}
              tabIndex="0"
              onBlur={() => setIsInformationVisible(false)}
            >
              <div
                className="information-link-container px-2"
                onClick={() => setIsInformationVisible((value) => !value)}
              >
                <p className="links">INFORMATION</p>
                {position.y >= SCROLL_THRESHOLD ? (
                  <img
                    src="/images/icon/icon-caret-down-primary.svg"
                    className="icon-caret active-icon"
                    alt="icon"
                  />
                ) : (
                  <img
                    src="/images/icon/icon-caret-down-white.svg"
                    className="icon-caret inactive-icon"
                    alt="icon"
                  />
                )}
              </div>

              <div className="information-links">
                <Link href="#for-tenants">
                  <p className="links">HOW TO RENT</p>
                </Link>

                <Link href="/pricing">
                  <p className="links">PRICING</p>
                </Link>

                <Link href="/rental-tips">
                  <p className="links">RENTAL TIPS</p>
                </Link>

                <Link href="/about">
                  <p className="links">ABOUT US</p>
                </Link>

                <Link href="/media">
                  <p className="links">MEDIA</p>
                </Link>
              </div>
            </div>

            <Link href="#for-landlords">
              <p className="links">RENT OUT</p>
            </Link>
          </div>

          <div className="portal-choices">
            {accessToken ? (
              <button onClick={onLogout}>
                <p className="links logout mx-5">LOGOUT</p>
              </button>
            ) : (
              <>
                <button onClick={onLoginClick}>
                  <p className="links login mr-3">LOGIN</p>
                </button>
                <button onClick={onRegisterClick}>
                  <p className="links sign-up">SIGN UP</p>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="user-language-container">
          <ToggleSwitch
            classNames="toggle-switch-language"
            name="language"
            onValue={languageSwitchOptions.EN}
            onLabel="EN"
            offValue={languageSwitchOptions.NL}
            offLabel="NL"
            value={language}
            onChange={setLanguage}
          />

          {me && (
            <Dropdown>
              <DropdownTrigger>
                <button className="mt-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="/images/photo-placeholder.png" alt="" />
                </button>
              </DropdownTrigger>
              <DropdownContent>
                <div className="relative">
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <Link href="/account"><span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</span></Link>
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={onLogout}>Log out</span>
                  </div>
                </div>
              </DropdownContent>
            </Dropdown>
          )}

        </div>

        <button
          className={cn('btn-burger-menu', { 'd-none': menuVisible })}
          onClick={() => setMenuVisible(true)}
        >
          <img src="/images/icon/icon-burger-menu-primary.svg" alt="icon" />
        </button>
      </section>

      <HomePageMenu
        isVisible={menuVisible}
        language={language}
        setLanguage={setLanguage}
        onClose={() => setMenuVisible(false)}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogout}
      />
    </>
  );
};

export default HomePageHeader;
