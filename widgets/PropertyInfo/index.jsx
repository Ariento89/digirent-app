import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import cn from 'classnames';
import { useProperties } from 'hooks/useProperties';
import { useAuthentication } from 'hooks/useAuthentication';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from 'shared/types';
import { API_ASSET_URL } from 'services/index';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';
import { Carousel } from 'react-responsive-carousel';
import HomeLoginModal from 'widgets/_PageHome/HomeLoginModal';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const propertyInfoSelectionType = {
  NOT_SELECTED: 'NOT_SELECTED',
  SELECTED: 'SELECTED',
  STILL_TO_COMMENT: 'STILL_TO_COMMENT',
};

const useStyles = makeStyles(() => ({
  cardImageWrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: '66.66%',
  },
  cardImageContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    height: '100%',

    '& .carousel-root': {
      height: '100%'
    },

    '& .carousel.carousel-slider': {
      height: '100%'
    },

    '& .carousel .slider-wrapper': {
      height: '100%'
    },

    '& .carousel .slider-wrapper .slider': {
      height: '100%'
    }
  },
  infoContainer: {
    padding: '0.875rem 1rem 1rem 1rem'
  },
  infoListItem: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    paddingTop: '8px'
  },
  priceContainer: {
    padding: 0
  },
  priceLabel: {
    color: '#47a4f5',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  billsContainer: {
    color: '#566a79',
    fontSize: '0.75rem',
    lineHeight: 1.375
  },
  infoDivider: {
    color: '#aab4bb',
    marginLeft: '4px',
    marginRight: '4px',
  },
  infoDefaultText: {
    color: '#2d4658',
    fontSize: '0.875rem',
    fontWeight: 'normal',
    lineHeight: '1.375',
  },
  arrowWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  arrowContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  }
}));

const PropertyInfo = ({
  name,
  address,
  rentFee,
  houseType,
  bathrooms,
  selectionType,
  size,
  availableFrom,
  houseImage,
  buttonName,
  onClick,
  onDelete,
  link,
  propId,
  context,
}) => {
  const classes = useStyles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const { postFavoriteProperty, deleteFavoriteProperty, status, errors } = useProperties();
  const { accessToken } = useAuthentication();
  const { addToast } = useToasts();

  const nextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide(value => value + 1);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide(value => value - 1);
  };

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    if (context) {
      setIsFavorite(context.is_favorited);
    }
  }, [context])

  const toggleFavoriteProperty = (e) => {
    e.preventDefault();
    if (accessToken) {
      isFavorite ? deleteFavoriteProperty({propertyId: propId}, {
                    onSuccess: onFetchSuccess,
                    onError: onFetchError,
                  })
                 : postFavoriteProperty({propertyId: propId}, {
                    onSuccess: onFetchSuccess,
                    onError: onFetchError,
                 });
    } else {
      setLoginModalVisible(true);
    }
  };

  const onFetchSuccess = ({ response }) => {
    console.log("@34234234234243");
    setIsFavorite(value => !value)
  };

  const onFetchError = () => {
    addToast('An error occurred while check favorite property.', toastTypes.ERROR);
  }

  const getContent = () => (
    <Card sx={{ maxWidth: 345 }} className='position-relative h-full'>
      <div className={classes.cardImageWrapper}>
        <div className={classes.arrowWrapper}>
          <div className={classes.arrowContainer}>
            <IconButton onClick={prevSlide} style={{ color: 'white', filter: 'drop-shadow(0px 1px 3px #2d4658)' }} aria-label="left">
              <ChevronLeftIcon style={{ fontSize: 40 }} />
            </IconButton>
            <IconButton onClick={nextSlide} style={{ color: 'white', filter: 'drop-shadow(0px 1px 3px #2d4658)' }} aria-label="right">
              <ChevronRightIcon style={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </div>
        <div className={classes.cardImageContainer}>
          <Carousel
            autoplay
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            selectedItem={currentSlide}
            onChange={updateCurrentSlide}
          >

            {Array.isArray(houseImage) ? (
              houseImage.map((house,index) => (
                <div key={index} className='w-full h-full'>
                  <img src={`${API_ASSET_URL}${house}`} className='h-full object-cover'/>
                </div>
              ))
            ) : (
              <img src="/images/house-sample-2.jpg" className='h-full object-cover' /> 
            )}
          </Carousel>
        </div>
      </div>
      <div className='fab-label-wrapper d-flex'>
        <div className='flex-grow-1'>

        </div>
        <Fab
          aria-label='favorite'
          className='fab-button'
          onClick={toggleFavoriteProperty}
        >
          <FavoriteIcon fontSize='small' className={cn('fab--favorite-icon', { favorite: isFavorite })} />
        </Fab>
      </div>
      <div>
        <ul className={classes.infoContainer}>
          <li className={`${classes.infoListItem} ${classes.priceContainer}`}>
            <h3 className={classes.priceLabel}>€{rentFee}</h3>
            <span className={classes.billsContainer}>/month (Bills excluded)</span>
          </li>
          <li className={classes.infoListItem}>
            <span className={classes.infoDefaultText}>
              {houseType}
              {
                bathrooms &&
                  <>
                    <span className={classes.infoDivider}>•</span>
                    {bathrooms} bathrooms
                  </>
              }
              <span className={classes.infoDivider}>•</span>
              {size} m²
            </span>
          </li>
          <li className={classes.infoListItem}>
            <span className={classes.infoDefaultText}>
              Available In{' '}<Moment fromNow ago>{availableFrom}</Moment>
            </span>
          </li>
        </ul>
      </div>
      
    </Card>
    // <div className={cn('property-info main-box p-0', { clickable: !!link })}>
  );

  // return !onDelete ? <Link href={link}>{getContent()}</Link> : getContent();
  return (
    <>
      {!onDelete ?<Link href={link}>{getContent()}</Link>: getContent()}
      <HomeLoginModal
        isVisible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </>
  )
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
