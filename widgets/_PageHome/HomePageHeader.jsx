/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import cn from 'classnames';
import ToggleSwitch from 'components/ToggleSwitch/index';
import { useAuthentication } from 'hooks/useAuthentication';
import { useLanguage } from 'hooks/useLanguage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useScrollData } from 'scroll-data-hook';
import { languageSwitchOptions, role, toastTypes } from 'shared/types';
import { API_ASSET_URL } from 'services/index';
import { useMe } from 'hooks/useMe';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import HomePageMenu from './HomePageMenu';

const SCROLL_THRESHOLD = 100;

const HomePageHeader = ({ onLoginClick, onRegisterClick }) => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [image, setUserImage] = useState(null);
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
      <section className={'layout-homepage-header active'}>
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
              {/* <p className="links">RENTALS</p> */}
              <button type="button" className="main-menu--btn inline-flex items-center px-3 py-2 leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                RENTALS
              </button>
            </Link>

            <Link href="#for-landlords">
              {/* <p className="links ml-4 bg-blue-400">RENT OUT</p> */}
              <button type="button" className="main-menu--btn ml-4 inline-flex items-center px-3 py-2 leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                RENT OUT
              </button>
            </Link>
          </div>

          <div className="portal-choices">
            {!accessToken && (
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
                  <img className="h-12 w-12 rounded-full" src={image || "/images/photo-placeholder.png"} alt="" />
                </button>
              </DropdownTrigger>
              <DropdownContent>
                <div className="relative">
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link href="/account">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Account
                      </span>
                    </Link>

                    <Link href="/notifications">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Notifications
                      </span>
                    </Link>

                    {me?.role === role.TENANT && (
                      <Link href="/favorites">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Favorites
                        </span>
                      </Link>
                    )}

                    {me?.role === role.LANDLORD && (
                      <Link href="/my-properties">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Properties
                        </span>
                      </Link>
                    )}

                    {me?.role === role.TENANT && (
                      <Link href="/properties">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Properties
                        </span>
                      </Link>
                    )}

                    <Link href="/messages">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Messages
                      </span>
                    </Link>

                    <Link href="/payments-landlord">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Payments
                      </span>
                    </Link>

                    {me?.role === role.LANDLORD && (
                      <Link href="/contracts-landlord">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Contracts
                        </span>
                      </Link>

                    )}

                    {me?.role === role.TENANT && (
                      <Link href="/contracts-tenant">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Contracts
                        </span>
                      </Link>
                    )}

                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={onLogout}
                    >
                      Log out
                    </span>
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
