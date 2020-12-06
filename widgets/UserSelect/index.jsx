import cn from 'classnames';
import { userTypes } from 'shared/types';

export const UserSelect = ({ selected, onSelect, classNames }) => (
  <div className={cn('user-select', classNames)}>
    <div className={cn('item for-tenants', { active: selected === userTypes.TENANT })}>
      <div onClick={() => onSelect(userTypes.TENANT)}>
        <div className="rounded-icon mx-auto">
          <img className="icon-inactive" src="/images/icon/icon-key-gray.svg" alt="item icon" />
          <img className="icon-active" src="/images/icon/icon-key-primary.svg" alt="item icon" />
        </div>
        <span className="text mt-3 d-block text-center">FOR TENANTS</span>
      </div>
    </div>

    <div className={cn('item for-landlords', { active: selected === userTypes.LANDLORD })}>
      <div onClick={() => onSelect(userTypes.LANDLORD)}>
        <div className="rounded-icon mx-auto">
          <img className="icon-inactive" src="/images/icon/icon-roof-gray.svg" alt="item icon" />
          <img className="icon-active" src="/images/icon/icon-roof-primary.svg" alt="item icon" />
        </div>
        <span className="text mt-3 d-block text-center">FOR LANDLORDS</span>
      </div>
    </div>
  </div>
);
