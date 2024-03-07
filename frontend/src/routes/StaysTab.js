import React from "react";

function StayTab({ hotel }) {
   return (
       <div className="stay-tab">
           <div className="stay-image">
               <img src={hotel.image} alt="Hotel Image" />
           </div>
           <div className="stay-details">
               <h3 className="stay-name">{hotel.name}</h3>
               <p className="stay-price">Price: ${hotel.price}</p>
               <p className="stay-rating">Rating: {hotel.rating} Stars</p>
               <p className="stay-location">Location: {hotel.location}</p>
               <button className="apply-button">Apply</button>
           </div>
       </div>
   );
}

export default StayTab;
