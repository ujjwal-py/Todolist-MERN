# Fullstack Todolist
Implemented a todo list app using MERN stack. Here I implemented Auth using jwt and cookies. Used Zod for data validation. Used monogDB as database to store the user and tasks. State management using useState and useReducer along with error states and refresh states. Also implemented middlwares in express. Added dynamic routing that navigates users on page refreshes on the basis of their token.




## Tech Stack
### Libraries
**Frontend** - Axios, Tailwindcss, dotenv, react-router-dom

**Backend** - Zod, cookie-parser, dotenv, bycrypt, jsonwebtoken
### Framework
**Backend** - Express

## Run this in your system
### Prerequisites

- MongoDB community server 
- Node.js 

Clone the repo
```
git clone https://github.com/ujjwal-py/Todolist-MERN.git
cd Todolist-MERN
```
Run the backned and frontend servers in separate terminals 
```
cd ./frontend
npm install
npm run dev

cd ./backend
npm install 
npm start
```

Set up your .env from .env.example 

## Todo
- [x] Add a navbar and enable routing
- [x] Detailed Task viewing and updating 
- [x] Better UI and mobile responsive
- [x] States are getting too complex, need useReducer
- [x] Added Auth logic in the backend
- [x] Connect auth with frontend as well
- [x] Add validation for task update
- [ ] Implement the stats logic




**I swear this is the last todolist project**