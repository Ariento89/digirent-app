/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import cn from 'classnames';
import { ToggleSwitch } from 'components/ToggleSwitch/';
import { useLanguage } from 'hooks/useLanguage';
import Link from 'next/link';
import { useState } from 'react';
import { useScrollData } from 'scroll-data-hook';
import { languageSwitchOptions } from 'shared/types';
import HomePageMenu from './HomePageMenu';

const SCROLL_THRESHOLD = 100;

const HomePageHeader = ({ onLoginClick, onRegisterClick }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const { position } = useScrollData();
  const { language, setLanguage } = useLanguage();

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

          <div className="main-menu">
            <Link href="/property-list">
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
            <button onClick={onLoginClick}>
              <p className="links login mr-3">LOGIN</p>
            </button>
            <button onClick={onRegisterClick}>
              <p className="links sign-up">SIGN UP</p>
            </button>
          </div>
        </div>

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
      />
    </>
  );
};

export default HomePageHeader;
