# PrimeTrade-Assignment
Contains both frontend and backend for the primeTrade assignment 

Tech Stack

FRONTEND
React (Vite)
Tailwind CSS
Axios
React Router
React Hot Toast

BACKEND
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication (HTTP-only cookies)
bcrypt

OTHER
REST API
Cookie-based auth
CORS

Setup - 
Clone the repository 
git clone https://github.com/Parth-2112/PrimeTrade-Assignment.git
cd PrimeTrade-Assignment

BackEnd Setup - Create config.env file in data folder in backend  

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=Development

cd backend
npm install
npm run dev

backend will run on http://localhost:4000

FrontEnd Setup - 

cd frontend
npm install
npm run dev

frontend will run on http://localhost:5173

As you will connect your own database you will need to create a new user to use the website. 
You can test the backend using postman. 
You won't be able to access the protected routes on frontend without authentication. 
 
To see the live demo visit the hosted website- https://prime-trade-frontend.vercel.app/