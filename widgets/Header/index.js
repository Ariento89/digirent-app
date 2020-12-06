/* eslint-disable jsx-a11y/anchor-is-valid */
import { ToggleSwitch } from 'components/ToggleSwitch/index';
import { useLanguage } from 'hooks/useLanguage';
import Link from 'next/link';
import { languageSwitchOptions } from 'shared/types';

const Header = () => {
  const { language, setLanguage } = useLanguage();

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

            <div className="user" />
          </div>
        </div>

        <div className="header-menu">
          <div className="header-menu-wrapper">
            <div className="note">
              <Link href="/property">
                <span>List a property</span>
              </Link>
            </div>

            <div className="main-menu">
              <Link href="/property">
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
          <div className="back">
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
