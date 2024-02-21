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
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";


// We are defining a React component for building a UI that will handle
// the retrieval of city-specific data.
// Components in React are reusable which can be combined along with 
// other components to devel the final user interface. In our example, 
// Read along with Update, Add, and Cities formulate the UI we wish 
// to provide the end user in order to interact with the backend
// RESTful web service API we developed as part of the example in 
// Module 6 (example in Assignment 4). 
const Read = () => {
    // The utilization of useParams Hook facilitates the retrieval 
    // of encoded data from the URL path within a component when a 
    // Route is active or becomes activated by a link, such as when 
    // a user clicks on a link. In the App.js file, the route for 
    // retrieving information about a city (Read component) is 
    // defined as 'read/:'.The name of the parameter is cityName.
    // Hence, the cityName parameter represents encoded data within 
    // the URL. Our objective is to extract this data in order to 
    // utilize it within our component.
    const { cityName } = useParams();

    // useState Hook is a function that enables a component to set
    // and manage the state that is associated with a component. In 
    // this case, we would like to manage the data within this 
    // component for a city. When a change is made to that data, 
    // useState (or React in this case) will update the UI
    // accordingly. 
    const [ city, setCities] = useState([]);

    // useNavigate Hook provides access to navigation 
    // features that can be associated with navigation
    // actions (e.g., when a page changes)
    const navigate = useNavigate();

    // When executing actions such as making HTTP requests and 
    // receiving associated responses, it is possible that a 
    // side effect could occur, such as an infinite loop. 
    // Therefore, it is desirable to provide a method that enables 
    // us to effectively manage and mitigate the potential adverse
    // consequences associated with these side effects. The 
    // useEffect Hook in React serves to handle side effects and 
    // mitigate their impact on the main component's processing. 
    // We are using Axios HTTP client library to construct our HTTP
    // Requests. Console.log is used for debugging purposes. The 
    // outcome of the console.log should be shown on the console
    // of the developer tools in the browser you use.
     useEffect(() => {
        axios.get("http://localhost:2000/" + cityName)
            .then((res) => {
                console.log(res);
                // retrieve the data associated with the city
                // will be available through the 'city' 
                // parameter declared in the setState Hook
                setCities(res.data[0]);
            })
            .catch((err) => console.log("Error: ", err));
    }, [cityName]);


    // This is a handler when the user clicks on the Delete
    // link. We would like to prompt the user to confirm that the
    // Delete action. If the user confirms the action, a DELETE HTTP
    // Request is constructed and executed to a URL that is handled
    // by the server programming we developed in backend service API.
    const handleDelete = async () => {
        const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
        if (deleteConfirmed) {
            try {
                await axios.delete(`http://localhost:2000/` + city.city);
                console.log(city.city);
                navigate("/");
            } catch (err) {
                console.log("Error:" + err);
            }
        } 
    };

    // The return for this component will output the HTML code that
    // we wish to present through the UI. Note the mapping of the
    // JavaScript variables or collections using the curly brackets
    // Example: {city.city} will retrieve the data from the city
    // collection for an element named city using its state at that
    // moment in time.
    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">TCSS460: React Frontend Example (CRUD: Read)</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>City Details</h3>
                    <table className="table table-bordered table-striped">
                        <tbody>
                            <tr>
                                <th>City</th>
                                <td>{city.city}</td>
                            </tr>
                            <tr>
                                <th>Population</th>
                                <td>{city.population}</td>
                            </tr>
                            <tr>
                                <th>Population Rank</th>
                                <td>{city.populationRank}</td>
                            </tr>
                            <tr>
                                <th>Population Density</th>
                                <td>{city.populationDensity}</td>
                            </tr>
                            <tr>
                                <th>Population Density Rank</th>
                                <td>{city.populationDensityRank}</td>
                            </tr>                            
                            <tr>
                                <th>Land Area</th>
                                <td>{city.landArea} per square mile</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><Link onClick={()=>handleDelete(city.city)} className="btn btn-danger">Delete</Link></p> 
            </div>
            <p><Link to={'../'} className="btn btn-primary">Return to main page.</Link></p>
        </div >
    );
};

export default Read;