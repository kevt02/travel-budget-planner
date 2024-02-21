// ****************************************************
// TCCSS 460: Tutorial 5B
// Winter 2024
// Building React Frontend
// Frontend consumes backend API (Tutorial 5A)
// Developed in Module 6
// ****************************************************
// ****************************************************
// IMPORTANT: PORT number for the backend web service
// API that is used in Tutorial 5a is 2000. Ensure this
// port number matches your backend web service
// API that is running. 
// ****************************************************

// Import necessary modules and libraries
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// We are defining a React component for building a UI that will handle
// the retrieval of all city data to be displayed in tabular format.
// Components in React are reusable which can be combined along with 
// other components to devel the final user interface. In our example, 
// Read along with Update, Add, and Cities formulate the UI we wish 
// to provide the end user in order to interact with the backend
// RESTful web service API we developed as part of the example in 
// Module 6 (example in Assignment 4). 
const Add = () => {
    // useState Hook is a function that enables a component to set
    // and manage the state that is associated with a component. In 
    // this case, we would like to manage the data within this 
    // component for a city. When a change is made to that data, 
    // useState (or React in this case) will update the UI
    // accordingly.   
    const [cities, setCity] = useState({
        city: "",
        population: "",
        populationRank: "",
        populationDensity: "",
        populationDensityRank: "",
        landArea: ""
    });
    
    // useNavigate Hook provides access to navigation 
    // features that can be associated with navigation
    // actions (e.g., when a page changes)
    const navigate = useNavigate();


    // handleChange is responsible for retrieving the value of a form element
    // associated with a specific element name. This method is used for handling
    // events assoicated with a form element.
    const handleChange = (e) => {
        setCity((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // handleSubmit is responsible for handling the form submission. In this case, 
    // we wish to post the data from the form elements to the URI that handles this
    // HTTP method. Note the use of decodeURI which decodes the data in the URL.  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(decodeURI("http://localhost:2000/"+ cities.City), cities)
            console.log(response.data)
            navigate("/");
          } catch (err) {
            console.log("Error: " + err);
          }
    };

    // The return for this component will output the HTML code that
    // we wish to present through the UI. Note the mapping of the
    // JavaScript variables or collections using the curly brackets
    // Example: {city.city} will retrieve the data from the city
    // collection for an element named city using its state at that
    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">TCSS460: React Frontend Example (CRUD: Create)</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Add City Detail</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                            <label>City Name:</label>
                            <input type="text" className="form-control" placeholder="City Name" name="city" onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Population:</label>
                            <input type="number" step="0.1" className="form-control" placeholder="Population" name="population" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Population Rank:</label>
                            <input type="number" min="1" max="300" step="1"  className="form-control"  placeholder="Select a Population Rank" name="populationRank" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Population Density:</label>
                            <input type="text" step="0.1" className="form-control" placeholder="Population Density" name="populationDensity" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Population Density Rank:</label>
                            <input type="number" min="1" max="300" step="1"  className="form-control" placeholder="Select a Population Density Rank" name="populationDensityRank" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Land Area:</label>
                            <input type="text" className="form-control" placeholder="Land Area" name="landArea" onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary" >Add City</button> 
                        <p></p> 
                        <p><Link  className="btn btn-secondary"  to="/">View all cities (Main Page)</Link></p>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Add;