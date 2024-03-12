import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Staystab from "./../components/StaysTab";
import { useAuth } from '../components/AuthContext';
function Stays() {
    const { uid } = useAuth();

    const navigate = useNavigate();

    const [city, setCity] = useState(""); // State to store city
    const [stay, setStay] = useState([]); // State to store stays data
    const [current, setCurrent] = useState([]); // State to store the current booking
    useEffect(() => {
        axios.get(`http://localhost:2000/savings/${uid}/goals/`)
            .then((res) => {
                console.log(res);
                if (res.data.length === 0) {
                    window.alert("You must set your goals first!");
                    navigate(`/savings`);
                } else {
                    const endCity = res.data[0].EndCity;
                   
                    setCity(endCity);
                    console.log(endCity);
                }
            })
            .catch((err) => console.log("Error: ", err));
    }, [uid]);


    useEffect(() => {
        axios.get(`http://localhost:2000/stays/${city}?UID=${uid}`)
            .then((res) => {
                console.log(res);
                setStay(res.data);
            })
            .catch((err) => console.log("Error: ", err));

    }, [city, uid]);

    useEffect(() => {
        axios.get(`http://localhost:2000/stays/${city}/current?UID=${uid}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setCurrent(res.data[0]);
                    console.log(res.data[0]);
                } else {
                    console.log("No current booking found.");
                }
            })
            .catch((err) => console.log("Error fetching stays data:", err));
    }, [city, uid]);    

    return (
        <>
            {city !== "" ? (
                <div>
                    <h1 className="message">Current Booking</h1>
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

                    <h1 className="message">Explore</h1>
                    {/* Render other stays */}
                    {stay.map(hotel => (
                        <Staystab key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            ) : (
                <h1 className="message">Please choose your goal first</h1>
            )}

        </>
    );

}

export default Stays;