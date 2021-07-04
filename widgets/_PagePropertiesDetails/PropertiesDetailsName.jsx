import React, { useState, useEffect } from "react";
import SocialMedias from 'widgets/SocialMedias/index';
import cn from 'classnames';
import Fab from '@material-ui/core/Fab';
import { toastTypes } from 'shared/types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useProperties } from 'hooks/useProperties';
import { useAuthentication } from 'hooks/useAuthentication';
import { useToasts } from 'react-toast-notifications';

const PropertiesDetailsName = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { postFavoriteProperty, deleteFavoriteProperty, status, errors } = useProperties();
  const { accessToken } = useAuthentication();
  const { addToast } = useToasts();
  
  useEffect(() => {
    if (property.context) {
      setIsFavorite(property.context.is_favorited);
    }
  }, [property.context])

  const toggleFavoriteProperty = (e) => {
    e.preventDefault();
    if (accessToken) {
      isFavorite ? deleteFavoriteProperty({propertyId: property.apartment.id}, {
                    onSuccess: onFetchSuccess,
                    onError: onFetchError,
                  })
                 : postFavoriteProperty({propertyId: property.apartment.id}, {
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

  useEffect(() => {
    if (property) {
      console.log(property);
    }
  }, [property]);

  return (
    <>
      <div className="propery-page-address d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <p className="mx-2">{property?.apartment.city}, {property?.apartment.state}, {property?.apartment.country}</p>
          <span> - </span>
          <p className="mx-2">{property?.apartment.houseType}</p>
          <span> - </span>
          <p className="mx-2">{property?.apartment.name}</p>
        </div>
        <div className="d-flex align-items-center">
          <SocialMedias />
          <Fab
            aria-label='favorite'
            className='fab-button ml-3'
            onClick={toggleFavoriteProperty}
          >
            <FavoriteIcon fontSize='small' className={cn('fab--favorite-icon', { favorite: isFavorite })} />
          </Fab>
        </div>
      </div>
    </>
  )
}

export default PropertiesDetailsName;
