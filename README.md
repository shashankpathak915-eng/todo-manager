# Task Tracker & Interactive To-Do List Management System

A responsive, single-page full-stack web application designed to help users dynamically manage daily schedules, visualize work priorities, and track task completions without page-reload delays.

## 🚀 Key Features
* **Full CRUD Operations:** Seamlessly Create, Read, Update, and Delete task items.
* **Dynamic Priorities:** Visual badge designations (High, Medium, Low) for workflow mapping.
* **Live Status Toggling:** Automated strikethrough styling triggers on task completion.
* **Decoupled Architecture:** React frontend working alongside an asynchronous background REST API engine.

## 🛠️ Built With
* **Frontend:** React (v18), JavaScript (ES6+), HTML5, CSS3
* **Styling Framework:** Bootstrap (v5)
* **Network / API Handlers:** Axios
* **Data Storage Layer:** JSON Server Mock Engine (Local persistence tracking)

## 📋 Prerequisites
Ensure you have the following installed on your local environment before continuing:
* **Node.js:** v24.22.1 (or any stable LTS release)
* **NPM:** Installed automatically alongside Node.js

## 💻 Installation & Local Run Steps

### 1. Extract and Install Dependencies
Open a command prompt configuration inside the extracted project directory folder and execute:
```bash
npm install
```

### 2. Activate the Database Server Runtime
Open a dedicated terminal tab inside the root project directory path and execute:
```bash
npx json-server --watch db.json --port 5000
```
*(Keep this window open to listen for REST API network communications on port 5000).*

### 3. Launch the Web Interface Layout
Open a secondary independent terminal tab or window inside the same directory path and execute:
```bash
npm start
```
The application will automatically package your system modules and initialize your live browser display at: `http://localhost:3000`

## ⚠️ Known Limitations
* Data is stored locally inside a lightweight flat `db.json` structure file.
* Does not support production-grade token multi-user security authentication architectures.
