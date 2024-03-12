# Penny Pilot Application

## Overview

The Penny Pilot is a web application that helps users manage their budget by adding credits. It allows users to view hotel and flight prices, check currency rates, and observe trends in ticket prices. The website also enables users to track their budget progress, update payment information, and save flight information, which is displayed on the main component. The backend is developed using Node.js and Express, incorporating middleware for logging, parsing requests, handling CORS, and managing environment variables. For data storage, it utilizes AWS RDS MySQL, ensuring scalable and reliable database services. The frontend is built with React, providing a user-friendly interface for interacting with budget and travel data.

## Data Source 
Since we're using an AWS database, there's no need to share the MySQL file. This is because AWS RDS MySQL handles our data storage, offering efficient and secure cloud-based management of our data.

## Technologies Used:

	- Backend: Node.js, Express
	- Middleware: Body-Parser, Cors
 	- Frontend: React
	- Database: AWS RDS MySQL

## Installation


** Backend Setup:

	- In VS code open my project in a new workspace and open the terminal
	- In the terminal navigate to the 'backend' directory: cd backend/

	- Run the following commands to initialize the project and install  all necessary 		  dependencies, including Express, Body-Parser, and Cors.
	  npm init -y
	  npm i install

** To run Penny Pilot (Runned on index.js)**
	- Ensure that your package.json has the following script for starting the Penny Pilot Web service :
	  "scripts":{
		"start": "nodemon index.js"
	  }

	- Then in the terminal, start the backend server with "npm start". It listens on the port default to http://localhost:2000.

** Frontend Setup:

	- Before we set up the frontend, on the terminal panel, click on the Split Terminal option. 	  After that, in the left terminal window, change directory to backend folder by running "cd   	  backend/". Then, start the Node.js project using the "npm start" command. After running the 	  backend, navigate to the frontend directory where the React application resides by running 	  "cd frontend/" in the right terminal. 
	- Before run npm, make sure to install React and other dependencies: 
	  npm install react-router-dom axios. 
	- After installing the dependencies, start the React development server by running
	  "npm start". 
	- This command launches the frontend application, which should automatically open in your 	  default web browser at http://localhost:3000. 

	
## Running the Application:

	- With the backend and frontend services running, access the application via 
	  http://localhost:3000 in a browser.
	- After setting up those, you should now see the main interface of the application, where you can interact with its features, such as adding credits to your budget, viewing hotel and flight prices, updating your payment info, reserving the hotel and flight, and managing your budget and travel plans.


