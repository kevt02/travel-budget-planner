import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Staystab from "./StaysTab";

function Stays() {
    const { user } = useParams(); // Get UID from URL params

    const [city, setCity] = useState(""); // State to store city
    const [stay, setStay] = useState([]); // State to store stays data
    const [current, setCurrent] = useState([]);
    useEffect(() => {
        // Fetch user's city using UID
        axios.get(`http://localhost:2000/goal/${user}`)
            .then((res) => {
                console.log(res);
                setCity(res.data[0].EndCity); // Assuming city is returned in the response
            })
            .catch((err) => console.log("Error: ", err));
    }, [user]);

    useEffect(() => {
        // Fetch stays data for the retrieved city
        axios.get(`http://localhost:2000/stays/${city}?UID=${user}`)
            .then((res) => {
                console.log(res);
                setStay(res.data); // Set stays data in state
            })
            .catch((err) => console.log("Error: ", err));

    }, [city, user]);

    useEffect(() => {
        axios.get(`http://localhost:2000/stays/${city}/current?UID=${user}`)
            .then((res) => {
                console.log(res);
                setCurrent(res.data); // Set stays data in state
            })
            .catch((err) => console.log("Error fetching stays data:", err));
    }, [city, user]);



    // Render the hotel options
    return (
        <div>
         
                <div className="stay-tab">
                    <div className="stay-image">
                        <img src={current[0].Image} alt="Hotel Image" />
                    </div>
                    <div className="stay-details">
                        <h3 className="stay-name">{current[0].Name}</h3>
                        <p className="stay-price">Price: ${current[0].Price}</p>
                        <p className="stay-rating">Rating: {current[0].Rating != null ? `${current[0].Rating}` : "---"}</p>
                        <p className="stay-location">Location: {current[0].Address}</p>
                    </div>
                </div>
      


            {/* Render other stays */}
            {stay.map(hotel => (
                <Staystab key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );

}

export default Stays;
