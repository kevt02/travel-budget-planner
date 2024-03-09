import './Stays.css'
import React from "react";

function StayTab({ hotel }) {
   return (
       <div className="stay-tab">
           <div className="stay-image">
               <img src={hotel.image} alt="Hotel Image" />
           </div>
           <div className="stay-details">
               <h3 className="stay-name">{hotel.Name}</h3>
               <p className="stay-price">Price: ${hotel.Price}</p>
               <p className="stay-rating">Rating: {hotel.Rating != null ? `${hotel.Rating}` : "---"}</p>
               <p className="stay-location">Location: {hotel.Address}</p>
               <div className = "button">
                 <button className="btn btn-primary">Apply</button>
               </div>
           </div>
       </div>
   );
}

export default StayTab;
