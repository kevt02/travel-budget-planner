import { useState,useEffect } from "react";
import axios from "axios";
import e from "cors";


export default function Preferences(){
    
    const [budget, setBudget] = useState(400);
    const [airports, setAirports] = useState([]);
    const [airportValue, setAirportValue] = useState("");
    const [originmode,setOriginMode] = useState(true);
    const[selectedOrigin,setSelectedOrigin]= useState(null)
    const[originDropdownOpen,setOriginDropdownOpen]=useState(false)
    const[destinationReceived,setDestinationReceived]=useState(false)
    const [destinationAirports, setDestinationAirports]=useState([])
    const[originReceieved,setOriginReceieved]=useState(false)
    const[destinationDropdownOpen,setDestinationDropdownOpen]=useState(false)
    const[selectedDestination,setSelectedDestination]=useState(null)
    
    
    
    const [flights, setFlights] = useState([]);
    const [location, setLocation] = useState("");
    const [destination, setdestination] = useState("");
    const[duration,setDuration]=useState("");
    const[originallocation,setOriginalLocation] = useState("")
    const[finaldestination,setFinalDestination] = useState("")

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
    const handledurationChange =(e) => {
        setDuration(e.target.value);
    
    }
    const handleOriginalLocation=(e) => {
        setOriginalLocation(e.target.value);
    }
    const handleFinalDestination=(e) => {
        setFinalDestination(e.target.value);
    }
    
    const toggleMenuOrigin = () => {
        setOriginDropdownOpen(!originDropdownOpen)
        
    }
    const toggleMenuDestination = ()=> {
        setDestinationDropdownOpen(!destinationDropdownOpen)
    }
    

        
        const getDestination = async () => {
            const params ={
                query:{market:"UK",
                locale:"en-GB",
                searchTerm:destination}

            };
            console.log(JSON.stringify(params))
            const url = "http://localhost:2000/skyscanner";
                        console.log(url)
            const options = {
               
                headers: {
                    'x-api-key': 'sh428739766321522266746152871799',
                    "Access-Control-Allow-Origin":"*"

                },
               
            };
        
            try {
                const response = await axios.post(url,params,options);
                const data = response.data;
                console.log(data)
                const new_airports = []
                data.places.forEach(element => {
                    new_airports.push(`${element.name} (${element.iataCode})`)
                });
                setDestinationAirports([...new_airports])
                setOriginReceieved(true)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        const getLocation = async () => {
            const params ={
                query:{market:"UK",
                locale:"en-GB",
                searchTerm:location}

            };
            console.log(JSON.stringify(params))
            const url = "http://localhost:2000/apiservices/v3/flights/live/search/create";
                        console.log(url)
            const options = {
               
                headers: {
                    'x-api-key': 'sh428739766321522266746152871799',
                    "Access-Control-Allow-Origin":"*"

                },
               
            };
        
            try {
                const response = await axios.post(url,params,options);
                const data = response.data;
                console.log(data)
                const new_airports = []
                data.places.forEach(element => {
                    new_airports.push(`${element.name} (${element.iataCode})`)
                });
                setAirports([...new_airports])
                setDestinationReceived(true)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // checkFlight();
    
    useEffect(()=>{
       const requestdictonary= { 
            "locale": location
        }
    },[])
    useEffect(()=>{
        if(selectedOrigin && selectedDestination){
            let originParts = selectedOrigin.toString().split(/[()]/)
            let origin = originParts[1].trim()
            let destinationParts = selectedDestination.toString().split(/[()]/)
            let destination = destinationParts[1].trim()
           
            const fetchFlights = async()=>{
                const url = "http://localhost:2000/skyscanner";
                const params={
                    query:{market:"UK",
                    locale:"en-GB",
                    currency: "USD",
                    queryLegs:[
                        {
                        originPlaceId: {
                        iata:origin,
                        },
                        destinationPlaceId: {
                        iata:destination,
                        },
                        date: {
                        year: 2024,
                        month: 3,
                        day: 16
                        }
                        }
                        ],
                        adults: 1,
                    },
                }
                const options={
                    headers: {
                        'x-api-key': 'sh428739766321522266746152871799',
                        "Access-Control-Allow-Origin":"*"
    
                    },
                }
                try {
                    const response = await axios.post(url,params,options);
                    const data = response.data;
                    console.log(data)
                } catch (error) {
                    console.error('Error:', error);
                }


        }
        fetchFlights()
        }
       
    },[selectedOrigin,selectedDestination])

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
                <button onClick={getLocation}>get Location </button>
                <input type="text" value={destination} onChange={handledestinationChange} placeholder="destination" />
                <button onClick={getDestination}> getDestination </button>
                <div>
                { destinationReceived && (   
                    <button onClick={toggleMenuOrigin}>
                        {selectedOrigin || 'select starting point'}
                    </button>
                )}
                { originDropdownOpen && (
                    <ul> 
                     {airports.map((airport, index) => (
                        <li key={index}onClick={()=>{
                            setSelectedOrigin(airport)
                            toggleMenuOrigin()
                        }}>{JSON.stringify(airport)}</li>
                    ))}   
                    </ul>
                )}
               
                { originReceieved && (   
                    <button onClick={toggleMenuDestination}>
                        {selectedDestination || 'select destination'}
                    </button>
                )}
                { destinationDropdownOpen && (
                    <ul> 
                     {destinationAirports.map((airport, index) => (
                        <li key={index} onClick={()=>{
                            setSelectedDestination(airport)
                            toggleMenuDestination()
                        }}>{JSON.stringify(airport)}</li>
                    ))}   
                    </ul>
                )}
                </div>
            </div>
            <label>
                duration
            </label>
            <br>
            </br>
            <div>
                 <input type="text" value={duration} onChange={handledurationChange}placeholder="duration" />
            </div>
            <div>
                <input type="text" value={originallocation} onChange={handleOriginalLocation}placeholder="originallocation" />
            </div>
            <div>
            <input type="text" value={finaldestination } onChange={handleFinalDestination}placeholder="finaldestination" />
            </div>
           
        </>
    );

}

