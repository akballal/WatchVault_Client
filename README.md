# WatchVault
WatchVault is an open-source application where users can maintain a history of all the movies, series, and other media they have watched. The project leverages modern technologies to deliver an intuitive and user-friendly experience for tracking and managing watched content.

# Features
* Track Watched History: Add movies, series, or any media to your watched list.
* Search and Filter: Quickly find specific items from your history.

# Repository Overview
* Frontend (this repository): Contains the user interface built with React and Vite.
* Backend: The backend server handles data management and API endpoints. Find the backend server code here: [WatchVault Server.](https://github.com/akballal/WatchVault_Server)

# Getting Started
Follow the steps below to run the project locally.

1. Clone the repository:
```bash
git clone https://github.com/akballal/WatchVault_Client
cd WatchVault_Client
```

2. Install dependencies:
```bash
npm install
```

3. Running the Frontend
1. Start the development server:
```bash
npm run dev
```
2. By default, the application will be available at http://localhost:5173.
3. Ensure the backend server is running and accessible. See the backend setup instructions here: [WatchVault Server.](https://github.com/akballal/WatchVault_Server/blob/main/README.md)
4. Update the backend server's URL in the frontend configuration file:
```bash
// src/config/apiConfig.ts
export const BASE_URL = 'http://localhost:8080';
```
# Running the Application Locally Using Docker
Follow these steps to build and run the application in a Docker container:

1. Build the Docker Image
```bash
docker build -t watchvault-client .
```
2. Run the Docker Container
```bash
docker run -p 5173:5173 watchvault-client
The application will be available at http://localhost:5173.
```

# Contributing
We welcome contributions! To get started:

    1.Fork the repository.
    2.Clone your fork locally.
    3.Create a new branch for your feature/fix.
    4.Commit your changes with descriptive messages.
    5.Push to your fork and submit a pull request.

# Feedback
Have ideas or suggestions? Feel free to open an issue or reach out!