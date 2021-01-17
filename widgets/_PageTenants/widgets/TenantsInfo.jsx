import Badge from 'components/Badge/index';
import Button from 'components/Button/index';
import { truncate } from 'lodash';

const TenantsInfo = ({
  firstName,
  age,
  profilePercentage,
  city,
  houseType,
  maxBudget,
  onAboutMe,
}) => (
  <div className="item main-box p-0">
    <div className="main-box tenant-info">
      <div className="d-flex align-items-center justify-content-center">
        <span className="text-sm font-weight-bold">
          {truncate(firstName, { length: 6, omission: '..' })}
        </span>
        <span className="text-sm">, {age}</span>
        <img
          className="ml-2"
          src="/images/icon/icon-gender-primary.svg"
          height="15"
          width="15"
          alt="icon"
        />
      </div>
      <span className="d-block text-sm text-primary mt-2">STUDENT</span>
    </div>

    <div className="top">
      <div className="photo-holder">
        <div className="status">
          <div className="profile-completion">
            <span className="font-weight-bold d-block">{profilePercentage}% PROFILE</span>
            COMPLETION
          </div>
          <div className="verified">VERIFIED</div>
        </div>

        <div className="star-photo">
          <img src="/images/icon/icon-star-white.svg" alt="icon" />
        </div>
        <div className="photo-additional-bg">
          <img src="/images/account-profile-bg.svg" width="100%" alt="bg profile" />
        </div>
      </div>
    </div>

    <div className="bottom">
      <p className="main-desc dark-gray2 text-center">SEARCHING:</p>
      <div className="searches mt-2">
        <div>
          <Badge label={houseType} />
          <Badge label="Min 60m²" classNames="mt-2" />
        </div>
        <div>
          <Badge label={city} />
          <Badge label={`Max € ${maxBudget}`} classNames="mt-2" />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center btn-about-me-container">
        <Button className="btn-about-me" onClick={onAboutMe}>
          ABOUT ME
        </Button>
      </div>
    </div>
  </div>
);

export default TenantsInfo;
