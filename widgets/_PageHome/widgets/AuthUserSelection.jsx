import cn from 'classnames';
import { userTypes } from 'shared/types';

const AuthUserSelection = ({ title, userType, onSelectUser }) => (
  <>
    <div className="icon-user rounded-icon primary mx-auto">
      <img src="/images/icon/icon-user-white.svg" alt="item icon" />
    </div>
    <div className="top-toggle mx-auto d-block">
      <img className="toggle-bg mx-auto" src="/images/login-register-toggle.svg" alt="background" />
      <div
        className={cn('toggle-icon tenant-icon', {
          active: userType === userTypes.TENANT,
        })}
      />
      <div
        className={cn('toggle-icon landlord-icon', {
          active: userType === userTypes.LANDLORD,
        })}
      />
    </div>

    <p className="title">{title}</p>

    <div className="button-toggler mt-2 d-flex">
      <button
        type="button"
        className={cn('button min-width btn-as-tenant', {
          active: userType === userTypes.TENANT,
        })}
        onClick={() => onSelectUser(userTypes.TENANT)}
      >
        AS TENANT
      </button>
      <button
        type="button"
        className={cn('button min-width btn-as-landlord', {
          active: userType === userTypes.LANDLORD,
        })}
        onClick={() => onSelectUser(userTypes.LANDLORD)}
      >
        AS LANDLORD
      </button>
    </div>
  </>
);

export default AuthUserSelection;
