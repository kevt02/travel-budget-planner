import { useState, useEffect } from "react";


export default function Preferences() {
    const airport_iata = {
        "WBU": "Burbank",
        "YVO": "Burlington",
        "BOH": "Bushehr",
        "BZN": "Butte",
        "BDL": "Chongqing",
        "BRD": "Christchurch",
        "BSB": "Chuathbaluk",
        "BTS": "Cincinnati",
        "BZV": "Ciudad Del Carmen",
        "BRE": "Cleveland",
        "BES": "Cleveland Burke Lakefront",
        "BDR": "Cochabamba",
        "BNE": "Cochin",
        "BRS": "Coeur DAlene",
        "BRO": "Cold Bay",
        "BRU": "Colima",
        "BGA": "College Station",
        "BUH": "Cologne",
        "BBU": "Colombo",
        "OTP": "Colorado Springs",
        "BUD": "Columbia",
        "EZE": "Columbia",
        "AEP": "Columbus",
        "BJM": "Columbus",
        "BUQ": "Columbus",
        "BDG": "Conakry",
        "BUR": "Concepcion",
        "BTV": "Copenhagen",
        "BUZ": "Copenhagen Roskilde",
        "BTM": "Copiapo",
        "CKG": "Cordova",
        "CHC": "Cork",
        "CHU": "Corning Elmira",
        "CVG": "Coro",
        "CME": "Corpus Christie",
        "CLE": "Corpus Christie Cabaniss Field",
        "CLE": "Corpus Christie Cuddihy Field",
        "CBB": "Cotonou",
        "COK": "Coyhaique",
        "COE": "Cozumel",
        "CDB": "Crokked Creek",
        "CLQ": "Cruzeiro Do Sul",
        "CLL": "Cuenca",
        "CGN": "Cuiaba",
        "CMB": "Culebra",
        "COS": "Culiacan",
        "CAE": "Cumana",
        "COU": "Curacao",
        "CMH": "Curitiba",
        "CSG": "Cusco",
        "UBS": "Detroit",
        "CKY": "Detroit City",
        "CCP": "Detroit Willow Run",
        "CPH": "Dhahran",
        "RKE": "Dhaka",
        "CPO": "Dillingham",
        "CDV": "Djerba",
        "ORK": "Djibouti",
        "ELM": "Doha",
        "CZE": "Dominica Cane Field",
        "CRP": "Dominica Melville Hall",
        "NGW": "Dothan",
        "CUX": "Douala",
        "COO": "Dresden",
        "GXQ": "Dubai",
        "CZM": "Dublin",
        "CKD": "Duluth",
        "CZS": "Durango",
        "CUE": "Durango",
        "CGB": "Durban",
        "CPX": "Dusseldorf",
        "CUL": "Dutch Harbor",
        "CUM": "Enschede",
        "CUR": "Entebbe",
        "CWB": "Ercan",
        "CUZ": "Erevan",
        "DTT": "Erfurt",
        "DHA": "Erie",
        "DAC": "Eugene",
        "DLG": "Evansville",
        "DJE": "Evenes",
        "JIB": "Exeter",
        "DOH": "Frankfurt",
        "DOM": "Fredericton",
        "DCF": "Freeport",
        "DHN": "Freetown",
        "DLA": "Freetown Hastings",
        "DRS": "Fresno",
        "DXB": "Friedrichshafen",
        "DUB": "Ft de France",
        "DLH": "Ft Pierce",
        "DGO": "Ft Simpson",
        "DRO": "Ft Smith",
        "DUR": "Ft Wayne",
        "DUS": "Ft Yukon",
        "DUT": "Fukuoka",
        "ENS": "Funchal",
        "EBB": "Fuzhou",
        "ECN": "Great Falls",
        "EVN": "Green Bay"
    }
    
    const [budget, setBudget] = useState(400);
    const [airports, setAirports] = useState(Object.keys(airport_iata));
    const [airportValue, setAirportValue] = useState("");

    const [flights, setFlights] = useState([]);
    const [location, setLocation] = useState("");
    const [destination, setdestination] = useState("");

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const handledestinationChange = (e) => {
        setdestination(e.target.value);
    }

    const handleChange = (e) => {
        setBudget(e.target.value);
    }

    const handleAirportChange = (e) => {
        setAirportValue(e.target.value);
    }
    
    const onCheckFlight = () => {

        const checkFlight = async () => {
            const params = new URLSearchParams({
                version: 'v2',
                DepartureAirport: 'JFK',
                ArrivalAirport: 'LAX',
                CodeType: 'IATA',
                DepartureDateTime: '2024-03-01T08:00:00',
                ArrivalDateTime: '2024-06-01T12:00:00'
            });
        
            const url = `https://flight-info-api.p.rapidapi.com/schedules?${params}`;
        
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9db89133famsh6b1499aed46b677p172d92jsncf6b1c7d7cb5',
                    'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com'
                }
            };
        
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkFlight();
    }
        

    return (
        <>
            <div>
                <label>
                    Budget: ${budget}
                </label>
                <input type="range" min={0} max={2000} value={budget} onChange={handleChange} />
            </div>
            <div>
                <input type="text" value={location} onChange={handleLocationChange} placeholder="Origin" />
                <input type="text" value={destination} onChange={handledestinationChange} placeholder="destination" />
                <button onClick={onCheckFlight}>Check Flights</button>
                <ul>
                    {flights.map((flight, index) => (
                        <li key={index}>{flight}</li>
                    ))}
                </ul>
                <ul>
                    {airports.map((airport, index) => (
                        <li key={index}>{airport}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
