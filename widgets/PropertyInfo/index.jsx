import Button from 'components/Button/index';
import Link from 'next/link';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import cn from 'classnames';
import { API_ASSET_URL } from 'services/index';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Moment from 'react-moment';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const propertyInfoSelectionType = {
  NOT_SELECTED: 'NOT_SELECTED',
  SELECTED: 'SELECTED',
  STILL_TO_COMMENT: 'STILL_TO_COMMENT',
};


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
}) => {
console.log(houseImage);

  const getContent = () => (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardHeader
        title={name}
      /> */}
        {/* <Slider {...slideSettings} className="list"> */}
        <Carousel autoplay>

          { Array.isArray(houseImage) ? 
          houseImage.map((house,index) => (
            <div key={index}>
              {/* <CardMedia
                sx={{
                  height: 0,
                  paddingTop: '60.25%', // 16:9
                }}
                image= */}
        <img src={`${API_ASSET_URL}${house}`}/>
            </div>
          )):
          <img src="/images/house-sample-2.jpg"/> 
          }
        {/* </Slider>   */}
      </Carousel>

      <CardContent style={{ marginTop:'10px' }} className="table">
       <p>€{rentFee}<span style={{ fontSize: '12px', fontWeight: '300' }}>/month (Bills excluded)</span></p>
        <ul id="horizontal-list" style={{ fontSize: '13px', listStyleType:'square', fontWeight: '300'  }}>
          <li>
          {name}, {address} 
          </li>
          <span><li>
          {houseType} 
          </li>
          <li>
          {size}m² 
          </li>
          <li>
          Available In <Moment fromNow ago>{availableFrom}</Moment> 
          </li></span>
        </ul>
      </CardContent>
      
    </Card>
    // <div className={cn('property-info main-box p-0', { clickable: !!link })}>
  );

  // return !onDelete ? <Link href={link}>{getContent()}</Link> : getContent();
  return !onDelete ?<Link href="/properties">{getContent()}</Link>: getContent();
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
