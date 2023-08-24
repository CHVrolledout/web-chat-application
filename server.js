const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8080;

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'], // Add the HTTP methods you want to allow
  credentials: true, // If you're using cookies or sessions
}));
app.use(cookieParser());

let connectedUsers = new Map();

io.on("connection", (socket) => {
  
  socket.on("nameSockMap", (data) => {
    connectedUsers.set(data.username, data.socketId);
    for(const [username,socketId] of connectedUsers){
      if(username != data.username){
        socket.broadcast.to(socketId).emit("newUser", data.username);
      }
    }
  });

  socket.on("requestUserList", (data) => {
    sendUserList(data);
  });

  socket.on("reMapSocketId", (data) => {
    if (connectedUsers.has(data.username)) {
      connectedUsers.set(data.username, data.socketId);
      
    }
  });

  socket.on("sendingMsg",(data)=> {
    for (const [username, socketId] of connectedUsers) {
      if(username != data.userSent){
        socket.broadcast.to(socketId).emit("sendingMsgFromServer", {userSent: data.userSent, messageToClient: data.msg} );
      }
    }

  });

  socket.on("logout",(username)=>{
    connectedUsers.delete(username);
    connectedUsers.forEach((socketIdC, usernameC) => {
      socket.broadcast.to(socketIdC).emit("removeUser",username);
    });    
  });


  function sendUserList(excludedSocketId) {
    const userList = Array.from(connectedUsers.entries())
      .filter(([username, socketId]) => socketId !== excludedSocketId)
      .map(([username]) => username);
    socket.emit("userList", userList);
  }
});

app.get("/chat.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "chat.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.use(express.static(path.join(__dirname, "src")));

http.listen(port, () => {
  console.log("App is listening");
});
