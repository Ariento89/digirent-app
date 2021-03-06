import Button from 'components/Button/index';
import Link from 'next/link';
import cn from 'classnames';

export const propertyInfoSelectionType = {
  NOT_SELECTED: 'NOT_SELECTED',
  SELECTED: 'SELECTED',
  STILL_TO_COMMENT: 'STILL_TO_COMMENT',
};

const PropertyInfo = ({
  name,
  address,
  rentFee,
  bedrooms,
  bathrooms,
  selectionType,
  houseImage,
  buttonName,
  onClick,
  onDelete,
  link,
}) => {
  const getContent = () => (
    <div className={cn('property-info main-box p-0', { clickable: !!link })}>
      {!!onDelete && (
        <button
          className="button-icon btn-delete gray2"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onDelete();
          }}
        >
          <img src="/images/icon/icon-cancel-dark-gray.svg" alt="icon" />
        </button>
      )}

      <div className="p-3 p-md-4">
        <h3 className="main-subtitle font-weight-bold text-left">{name}</h3>
        <div className="d-flex align-items-center mt-2">
          <img src="/images/icon/icon-map-marker-primary.svg" height="20" width="20" alt="icon" />
          <p className="ml-2 main-desc">{address}</p>
        </div>
      </div>

      <div className="house-bg" style={{ backgroundImage: `url(${houseImage})` }}>
        <div className="monthly-payment">
          <div className="icon-wrapper">
            <img src="/images/icon/icon-euro-white.svg" alt="icon" />
          </div>
          <span className="main-desc text-white text-center font-weight-bold value">{rentFee}</span>
          <span className="main-desc text-white text-center dash">–</span>
          <span className="main-desc text-white text-center mo">mo</span>
        </div>
        <div className="rooms-toilet">
          <div className="d-flex align-items-center justify-content-between">
            <img src="/images/icon/icon-bed-primary.svg" height="16" width="16" alt="icon" />
            <p className="ml-1 main-desc">{bedrooms}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <img src="/images/icon/icon-bath-tub-primary.svg" height="16" width="16" alt="icon" />
            <p className="ml-1 main-desc">{bathrooms}</p>
          </div>
        </div>

        {!!selectionType && (
          <>
            {selectionType === propertyInfoSelectionType.NOT_SELECTED && (
              <div className="selection not-selected main-desc">
                <span className="font-weight-bold d-block">NOT</span> SELECTED
              </div>
            )}

            {selectionType === propertyInfoSelectionType.SELECTED && (
              <div className="selection selected main-desc">SELECTED</div>
            )}

            {selectionType === propertyInfoSelectionType.STILL_TO_COMMENT && (
              <div className="selection still-to-comment main-desc">
                <span className="font-weight-bold d-block">STILL TO</span> SELECTED
              </div>
            )}
          </>
        )}
        {!!onClick && (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onClick();
            }}
          >
            {buttonName}
          </Button>
        )}
      </div>
    </div>
  );

  return link ? <Link href={link}>{getContent()}</Link> : getContent();
};

PropertyInfo.defaultProps = {
  selectionType: null,
  onClick: null,
  onDelete: null,
  onShow: null,
  buttonName: '',
  houseImage: '/images/house-sample-1.jpg',
};

export default PropertyInfo;
