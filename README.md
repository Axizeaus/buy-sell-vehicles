# Buy and Sell Vehicles

## Description
Buy and Sell Vehicles is a web application that allows users to easily buy and sell vehicles. The platform connects buyers and sellers, providing a user-friendly interface to list vehicles, browse available options, and communicate with potential buyers or sellers.

## Features
- User registration and authentication
- Vehicle listing with detailed descriptions and images
- Search and filter options for buyers

## Technologies used in this project
- Frontend
	- React
	- Typescript
	- TailwindCSS
	- TanstackQuery
	- Shadcn/ui
- Backend
	- ExpressJS
	- NodeJS
	- mongoose
	- jwt for authentication and authorization
	- jest for testing
	- javascript
- Database
	- mongodb
- Other
	- docker

## Installation
To get started with the project, follow these steps:

1. Clone the repository:    
	```bash
	git clone https://github.com/Axizeaus/buy-and-sell-vehicles.git

2. Navigate to the project directory:
	```bash 
   cd buy-sell-vehicles

3. Navigate to the frontend:
	```bash
	cd frontend
4. Install dependencies: 
	```bash
	npm install
5. rename .env.placeholder to .env
6. edit the contents in the .env file like so: 
	```VITE_BACKEND_URL="http://localhost:3333/api/v1"```
7. go to the backend: 
	```bash 
	cd ../backend
8. install dependencies: 
	```bash 
	npm install
9. make sure mongodb is running locally or you have a new mongodb atlas set up:
10. rename .env.placeholder to .env and edit the contents :
	```bash 
	 PORT=3333
	 DATABASE_URL=your_database_url
	 JWT_SECRET=your_secret
11. seed the database:
	```bash
	node seeding.js
12. run the backend:
	```bash
	npm run dev
13. run the frontend:
	```bash
	npm run dev
14. go to `localhost:5173` on your browser or the one appeared in the terminal.

