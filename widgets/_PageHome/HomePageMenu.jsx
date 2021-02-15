/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import ToggleSwitch from 'components/ToggleSwitch/index';
import { useAuthentication } from 'hooks/useAuthentication';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import { languageSwitchOptions } from 'shared/types';

const HomePageMenu = ({
  isVisible,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onClose,
  language,
  setLanguage,
}) => {
  // CUSTOM HOOKS
  const { accessToken } = useAuthentication();

  // METHODS
  const onRegister = () => {
    onClose();
    onRegisterClick();
  };

  const onLogin = () => {
    onClose();
    onLoginClick();
  };

  const onLogout = () => {
    onClose();
    onLogoutClick();
  };

  return (
    <Menu
      className="home-page-menu"
      width="100%"
      isOpen={isVisible}
      onClose={onClose}
      customBurgerIcon={false}
      customCrossIcon={false}
      right
    >
      <button className="button-icon gray2 btn-close" onClick={onClose}>
        <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
      </button>
      <div className="main-links">
        <Link href="/account">
          <p className="links">ACCOUNT</p>
        </Link>
        <Link href="/properties">
          <p className="links">RENTALS</p>
        </Link>
        <Link href="#for-tenants">
          <p onClick={onClose} className="links">
            HOW TO RENT
          </p>
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
        <Link href="#for-landlords">
          <p onClick={onClose} className="links">
            RENT OUT
          </p>
        </Link>

        <hr />

        <div className="portal-choices">
          {accessToken ? (
            <button onClick={onLogout}>
              <p className="links logout">LOGOUT</p>
            </button>
          ) : (
            <>
              <button onClick={onLogin}>
                <p className="links login mr-3">LOGIN</p>
              </button>
              <button onClick={onRegister}>
                <p className="links sign-up">SIGN UP</p>
              </button>
            </>
          )}
        </div>
      </div>

      <ToggleSwitch
        classNames="toggle-switch-language"
        name="language-2"
        onValue={languageSwitchOptions.EN}
        onLabel="EN"
        offValue={languageSwitchOptions.NL}
        offLabel="NL"
        value={language}
        onChange={setLanguage}
      />
    </Menu>
  );
};

export default HomePageMenu;
