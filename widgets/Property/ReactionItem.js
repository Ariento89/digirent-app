/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from 'react';

const ReactionItem = () => {
  const [buttonOverlayVisible, setButtonOverlayVisible] = useState(false);

  return (
    <div className="reaction-item">
      <div className="item d-none d-md-flex">
        <div className="user-photo" />

        <div className="user-name flex-1 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <span className="text-sm font-weight-bold">Jane</span>
            <span className="text-sm">, 22</span>
            <img
              className="ml-2"
              src="/images/icon/icon-gender-primary.svg"
              height="15"
              width="15"
              alt="icon"
            />
          </div>
          <p className="d-block text-sm text-primary m-0">STUDENT</p>
        </div>

        <div className="divider" />

        <div className="flex-1">
          <span className="profile-completion text-sm">
            <span className="font-weight-bold d-block">60% PROFILE</span>
            COMPLETION
          </span>
        </div>

        <div className="divider" />

        <div className="flex-1">
          <span className="verified text-sm">VERIFIED</span>
        </div>

        <div className="divider" />

        <div
          className="flex-1 buttons"
          onMouseOver={() => setButtonOverlayVisible(true)}
          onMouseOut={() => setButtonOverlayVisible(false)}
        >
          {buttonOverlayVisible && (
            <div className="button-overlay">
              <div className="item">
                <span className="circular-icon green mr-2" />
                <span className="text">SELECTED TO BE PICKED</span>
              </div>
              <div className="item">
                <span className="circular-icon gray mr-2" />
                <span className="text">REJECTED</span>
              </div>
              <div className="item">
                <span className="circular-icon yellow mr-2" />
                <span className="text">SELECTED AS RESERVE</span>
              </div>
            </div>
          )}

          <button type="button" className="button btn-icon btn-x gray2">
            <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
          </button>
          <button type="button" className="button yellow btn-icon btn-circle mx-2">
            <div className="circle-icon" />
          </button>
          <button type="button" className="button green btn-icon btn-check">
            <img src="/images/icon/icon-check-white.svg" alt="icon" />
          </button>
        </div>

        <div className="divider" />

        <div className="flex-1">
          <button type="button" className="button btn-email d-block mx-auto">
            <img src="/images/icon/icon-email-outline.svg" alt="icon" />
          </button>
        </div>
      </div>

      <div className="item mobile d-block d-md-none">
        <div className="user-name text-center">
          <div className="d-flex align-items-center justify-content-center">
            <span className="text-sm font-weight-bold">Jane</span>
            <span className="text-sm">, 22</span>
            <img
              className="ml-2"
              src="/images/icon/icon-gender-primary.svg"
              height="15"
              width="15"
              alt="icon"
            />
          </div>
          <p className="d-block text-sm text-primary m-0">STUDENT</p>
        </div>

        <div className="second-row mt-2">
          <span className="profile-completion text-sm">
            <span className="font-weight-bold d-block">60% PROFILE</span>
            COMPLETION
          </span>

          <span className="verified ml-2">VERIFIED</span>
        </div>

        <div
          className="buttons mt-2"
          onMouseOver={() => setButtonOverlayVisible(true)}
          onMouseOut={() => setButtonOverlayVisible(false)}
        >
          {buttonOverlayVisible && (
            <div className="button-overlay">
              <div className="item">
                <span className="circular-icon green mr-2" />
                <span className="text">SELECTED TO BE PICKED</span>
              </div>
              <div className="item">
                <span className="circular-icon gray mr-2" />
                <span className="text">REJECTED</span>
              </div>
              <div className="item">
                <span className="circular-icon yellow mr-2" />
                <span className="text">SELECTED AS RESERVE</span>
              </div>
            </div>
          )}

          <button type="button" className="button btn-icon btn-x gray2">
            <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
          </button>
          <button type="button" className="button yellow btn-icon btn-circle mx-1">
            <div className="circle-icon" />
          </button>
          <button type="button" className="button green btn-icon btn-check mr-1">
            <img src="/images/icon/icon-check-white.svg" alt="icon" />
          </button>
          <button type="button" className="button btn-email">
            <img src="/images/icon/icon-email-outline.svg" alt="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactionItem;
