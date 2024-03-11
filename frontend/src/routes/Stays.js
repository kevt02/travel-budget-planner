import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Staystab from "./StaysTab";
import { useAuth } from '../components/AuthContext';
function Stays() {
    const { uid } = useAuth();

    const navigate = useNavigate();

    const [city, setCity] = useState(""); // State to store city
    const [stay, setStay] = useState([]); // State to store stays data
    const [current, setCurrent] = useState([]);
    useEffect(() => {
        // Fetch user's city using UID
        axios.get(`http://localhost:2000/goal/${uid}`)
            .then((res) => {
                console.log(res);
                if (res.data.length === 0) {
                    window.alert("You must set your goals first!");
                    navigate(`/savings`);
                } else {
                    const endCity = res.data[0].EndCity;
                    console.log(endCity);
                    setCity(endCity);
                }
            })
            .catch((err) => console.log("Error: ", err));
    }, [uid]);


    useEffect(() => {
        // Fetch stays data for the retrieved city
        axios.get(`http://localhost:2000/stays/${city}?UID=${uid}`)
            .then((res) => {
                console.log(res);
                setStay(res.data); // Set stays data in state
            })
            .catch((err) => console.log("Error: ", err));

    }, [city, uid]);

    useEffect(() => {
        axios.get(`http://localhost:2000/stays/${city}/current?UID=${uid}`)
            .then((res) => {
                console.log(res);
                setCurrent(res.data[0]); // Set stays data in state
            })
            .catch((err) => console.log("Error fetching stays data:", err));
    }, [city, uid]);



    // Render the hotel options
    return (
        <>
            {city !== "" ? (
                <div>
                    <h1 className="stays">Current Booking</h1>
                    {current && current.Name && (
                        <div className="stay-tab">
                            <div className="stay-image">
                                <img src={current.Image} alt="Hotel Image" />
                            </div>
                            <div className="stay-details">
                                <h3 className="stay-name">{current.Name}</h3>
                                <p className="stay-price">Price: ${current.Price}</p>
                                <p className="stay-rating">Rating: {current.Rating != null ? `${current.Rating}/10` : "---"}</p>
                                <p className="stay-location">Location: {current.Address}</p>
                            </div>
                        </div>
                    )}

                    <h1 className="stays">Explore</h1>
                    {/* Render other stays */}
                    {stay.map(hotel => (
                        <Staystab key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            ) : (
                <h1 className="Message">Please choose your goal first</h1>
            )}

        </>
    );

}

export default Stays;