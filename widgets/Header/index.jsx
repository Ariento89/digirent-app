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
import { languageSwitchOptions, role } from 'shared/types';

const Header = () => {
  // STATES
  const [userImage, setUserImage] = useState(null);

  // CUSTOM HOOKS
  const router = useRouter();
  const {accessToken} = useAuthentication();
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

            {me && (
              <div
                className="user"
                style={{ backgroundImage: userImage ? `url(${userImage})` : undefined }}
              />
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

          {accessToken && !me?.emailVerified &&  <div className="note" style={{backgroundColor: 'red'}}>
            <span style={{color: 'white'}}>Not Verified</span>
          </div>}

            <div className="main-menu">
              <Link href="/properties">
                <a className="px-2 uppercase text-white">Properties</a>
              </Link>
              <span>|</span>
              <Link href="/messages">
                <a className="px-2 uppercase text-white">Messages</a>
              </Link>
              <span>|</span>
              <Link href="/payments-landlord">
                <a className="px-2 uppercase text-white">Payments</a>
              </Link>
              <span>|</span>
              <Link href="/contracts-landlord">
                <a className="px-2 uppercase text-white">Contracts</a>
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
