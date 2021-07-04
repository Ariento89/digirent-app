import { useState } from "react";

const PropertiesDetailsDescription = ({ property }) => {
  console.log(property)
  const [readMore, setReadMore] = useState(false)

  if (!readMore && property?.apartment.description.length >= 250){
    return (
    <div className="property-description">
      <p className="main-desc main-desc-header text-primary">Description</p>
      <p className="">{property?.apartment.description.substring(0, 250)}... <span onClick={e => setReadMore(!readMore)} className="property-readMore">Read more</span></p>
    </div>
    )
    
  }
  return (
    <div className="property-description">
      <p className="main-desc main-desc-header text-primary">Description</p>
      <p className="">{property?.apartment.description} {property?.apartment.description.length >= 250 ? <span onClick={e => setReadMore(!readMore)} className="property-readMore">Read less</span> : ''} </p>
    </div>
  )
};

export default PropertiesDetailsDescription;
