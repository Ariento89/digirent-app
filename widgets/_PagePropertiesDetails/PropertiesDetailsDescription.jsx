import { useState } from "react";

const PropertiesDetailsDescription = ({ property }) => {
  const [readMore, setReadMore] = useState(false)

  if (!readMore && property?.apartment.description.length >= 500){
    return (
    <div className="property-description">
      <p className="main-desc main-desc-header text-primary">DESCRIPTION</p>
      <p className="property-description--details">{property?.apartment.description.substring(0, 500)}... <span onClick={e => setReadMore(!readMore)} className="property-readMore">Read more</span></p>
    </div>
    )
    
  }
  return (
    <div className="property-description">
      <p className="main-desc main-desc-header text-primary">DESCRIPTION</p>
      <p className="">{property?.apartment.description} {property?.apartment.description.length >= 500 ? <span onClick={e => setReadMore(!readMore)} className="property-readMore">Read less</span> : ''} </p>
    </div>
  )
};

export default PropertiesDetailsDescription;
