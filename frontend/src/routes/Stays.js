import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Staystab from "./StaysTab";

function Stays() {
    const { user } = useParams(); // Get UID from URL params

    const [city, setCity] = useState(""); // State to store city
    const [stay, setStay] = useState([]); // State to store stays data

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
        axios.get(`http://localhost:2000/stays/${city}`)
            .then((res) => {
                console.log(res);
                setStay(res.data); // Set stays data in state
            })
            .catch((err) => console.log("Error: ", err));

    }, [city]);

    // Render the hotel options
    return (
        <div>
            {stay.map(hotel => (
                <Staystab key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
}

export default Stays;
