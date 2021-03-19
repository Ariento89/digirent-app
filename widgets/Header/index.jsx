/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from 'classnames';
import ToggleSwitch from 'components/ToggleSwitch/index';
import { useAuthentication } from 'hooks/useAuthentication';
import { useLanguage } from 'hooks/useLanguage';
import { useMe } from 'hooks/useMe';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { API_ASSET_URL, API_URL_WEBSOCKET } from 'services/index';
import { languageSwitchOptions, role, toastTypes } from 'shared/types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { useToasts } from 'react-toast-notifications';

const Header = () => {
  // STATES
  const [image, setUserImage] = useState(null);
  const { accessToken, logout } = useAuthentication();
  const { addToast } = useToasts();
  // CUSTOM HOOKS
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { me } = useMe();

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${API_URL_WEBSOCKET}/${accessToken}`);
    socketRef.current.onmessage = onMessage;

    return () => {
      socketRef.current.close();
    };
  }, [accessToken]);

  const onMessage = (event) => {
    const { data, eventType } = JSON.parse(event.data);
    console.log('onMessage', JSON.parse(event.data));
  };

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
                      className="h-8 w-8 rounded-full"
                      src="/images/photo-placeholder.png"
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
              <Link href="/notifications">
                <a className="text-white inline-block relative">
                  <span className="absolute top-2 right-1 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-red-400" />
                  <svg
                    className="px-2 h-10 w-10 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="header-back">
          <div className="back" onClick={onBack}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
