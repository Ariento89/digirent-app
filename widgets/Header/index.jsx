/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from 'classnames';
import ToggleSwitch from 'components/ToggleSwitch/index';
import { useAuthentication } from 'hooks/useAuthentication';
import { useLanguage } from 'hooks/useLanguage';
import { useMe } from 'hooks/useMe';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_ASSET_URL } from 'services/index';
import { languageSwitchOptions, role, toastTypes } from 'shared/types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { useToasts } from 'react-toast-notifications';
import NotificationBadge from 'widgets/Notification/NotificationBadge';

const Header = () => {
  // STATES
  const [image, setUserImage] = useState(null);
  const { accessToken, logout } = useAuthentication();
  const { addToast } = useToasts();
  // CUSTOM HOOKS
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { me } = useMe();

  // METHODS
  useEffect(() => {
    if (me?.profileImageUrl) {
      setUserImage(`${API_ASSET_URL}${me.profileImageUrl}`);
    }
  }, [me]);

  const onBack = () => {
    router.back();
  };

  const onLogout = () => {
    addToast('Successfully logged out.', toastTypes.SUCCESS);
    logout();
  };

  return (
    <>
      <img src="/images/header-bg.svg" alt="header background" className="header-background" />

      <section className="layout-header">
        <div className="header-logo-user">
          <div className="logo">
            <Link href="/">
              <h1 className="text">DIGI RENT</h1>
            </Link>
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

            {/* style={{ backgroundImage: userImage ? `url(${userImage})` : undefined }} */}

            {me && (
              <Dropdown>
                <DropdownTrigger>
                  <button
                    className="mt-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-12 w-12 rounded-full"
                      src={image || "/images/photo-placeholder.png"}
                      alt=""
                    />
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
        </div>

        {me
        && (
          <div className="header-menu">
            <div className={cn('header-menu-wrapper', { 'no-logged-in': !me })}>
              {me && (
                <div className="note">
                  {me?.role === role.LANDLORD && (
                    <Link href="/my-properties">
                      <span>List a property</span>
                    </Link>
                  )}

                  {me?.role === role.TENANT && (
                    <Link href="/properties">
                      <span>Rent a property</span>
                    </Link>
                  )}
                </div>
              )}

              {accessToken && !me?.emailVerified && (
                <div className="note" style={{ backgroundColor: 'red' }}>
                  <span style={{ color: 'white' }}>Not Verified</span>
                </div>
              )}
              {/*
              <div className="main-menu">
                {me?.role === role.LANDLORD && (
                  <Link href="/my-properties">
                    <a className="px-2 uppercase text-white">Properties</a>
                  </Link>
                )}

                {me?.role === role.TENANT && (
                  <Link href="/properties">
                    <a className="px-2 uppercase text-white">Properties</a>
                  </Link>
                )}

                <span>|</span>
                <Link href="/messages">
                  <a className="px-2 uppercase text-white">Messages</a>
                </Link>
                <span>|</span>
                <Link href="/payments-landlord">
                  <a className="px-2 uppercase text-white">Payments</a>
                </Link>
                <span>|</span>

                {me?.role === role.LANDLORD && (
                  <Link href="/contracts-landlord">
                    <a className="px-2 uppercase text-white">Contracts</a>
                  </Link>
                )}

                {me?.role === role.TENANT && (
                  <Link href="/contracts-tenant">
                    <a className="px-2 uppercase text-white">Contracts</a>
                  </Link>
                )}

                <span>|</span>
                <NotificationBadge />
              </div> */}
            </div>
          </div>
        ) }
        {/* <div className="header-back">
          <div className="back" onClick={onBack}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Header;
