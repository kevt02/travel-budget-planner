import './Stays.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function StayTab({ hotel }) {
    const { isLoggedIn, uid, login, logout } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:2000/stays/'" + hotel.City + "'/reset", {
                UID: uid
            });
            const response = await axios.put("http://localhost:2000/stays/" + hotel.City, {
                UID: uid,
                PropID: hotel.PropertyID
            });

            console.log(response);
            window.alert("You have successfully updated.");
            //navigate('/stays');

            window.location.reload(); // Refresh the page
        } catch (err) {
            console.log("Error: " + err);
        }
    };

    return (
        <div className="stay-tab">
            <div className="stay-image">
                <img src={hotel.Image} alt="Hotel Image" />
            </div>
            <div className="stay-details">
                <h3 className="stay-name">{hotel.Name}</h3>
                <p className="stay-price">Price: ${hotel.Price}</p>
                <p className="stay-rating">Rating: {hotel.Rating != null ? `${hotel.Rating}` : "---"}</p>
                <p className="stay-location">Location: {hotel.Address}</p>
                <div className="button">
                    <button className="btn btn-primary" onClick={handleSubmit}>Apply</button>
                </div>
            </div>

        </div>



    );
}

export default StayTab;