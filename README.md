# React CRUD Application

A simple and responsive CRUD (Create, Read, Update, Delete) system built with **React**. This project demonstrates the core concepts of React by implementing basic data management functionalities with a clean user interface.

## 🔧 Features

- Add new items
- View list of items
- Edit existing items
- Delete items
- Built with React functional components and hooks

 Technologies Used

- React (with Hooks)
- CSS / TailwindCSS
- JavaScript (ES6+)
- [Axios] (LocalHost)

This project uses JSON Server to simulate a RESTful API with a local db.json file.

📦 Requirements
Make sure you have Node.js installed. Then install JSON Server globally:

npm install -g json-server

Start the JSON Server

From the root directory of the project, run:
json-server --watch db.json --port 3001
db.json: Contains the fake data (you can edit it).

--port 6001: You can change this to any available port.

Once the server is running, you'll have a local REST API available at:

http://localhost:6001
