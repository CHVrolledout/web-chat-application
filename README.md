Local Chat Application Project
Description

This is a simple chat application project built using Node.js, Express.js, and Socket.io. It allows users to communicate with each other in real-time within a local network. The project uses cookies for user identification and provides a chat interface where users can send and receive messages.
Prerequisites

Before you begin, ensure you have met the following requirements:

    Node.js: Make sure you have Node.js installed on your machine. You can download it from nodejs.org.

Installation

To set up the project locally, follow these steps:

    Clone the repository to your local machine:

    bash

git clone git@github.com:CHVrolledout/web-chat-application.git

Navigate to the project directory:

bash

cd web-chat-application

Install project dependencies using npm:

bash

    npm install

Open the index.js and chat.js files located in the project's src directory.

In both index.js and chat.js, find the following lines:

javascript

const socket = io("ws://192.168.29.218:8080");

Replace "ws://192.168.29.218:8080" with the IP address of the computer where the server is running. The IP address should be in the format "ws://[your-computer-ip]:8080".

For example:

javascript

const socket = io("ws://192.168.0.100:8080");

Save the changes to the files.

Usage

To run the chat application, execute the following command:

bash

npm start

This will start the Node.js server using nodemon, which automatically restarts the server when you make changes to the code (useful for development).

After starting the server, you can access the chat application by opening a web browser and navigating to http://localhost:8080 (or the appropriate URL).
Project Structure

    server.js: The main server script that sets up the Express.js server and handles WebSocket communication using Socket.io.

Dependencies

The project relies on the following npm packages:

    express: Fast, unopinionated, minimalist web framework for Node.js.
    socket.io: Real-time bidirectional event-based communication library.
    cookie-parser: Middleware for parsing cookies.
    cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
    nodemon: Development dependency for automatic server restarts.

Contributing

Contributions are welcome! If you'd like to contribute to this project, please open an issue or submit a pull request.
License

This project is licensed under the ISC License. See the LICENSE file for details.
Author

    Hima Varshan  
    himavarshanreddy@gmail.com
