const socket = io("ws://192.168.29.218:8080");
const username = getCookieValue("username");
if(username== null){
  window.location.href = "index.html";
}
createUserList(username, true);



socket.on("connect", () => {
  socket.emit("nameSockMap", { username: username, socketId: socket.id });
  socket.emit("requestUserList", socket.id);
});

socket.on("reconnect", (attemptNumber) => {
  socket.emit("reMapSocketId", { username: username, socketId: socket.id });
});

socket.on("error", (error) => {
  console.error("Socket.IO error:", error);
});

// Receive and display user list
socket.on("userList", (userList) => {
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    createUserList(user, false);
  }
});

socket.on("sendingMsgFromServer",(data)=>{
  const parentContainer = document.getElementById("messagesId");
  const receivedMessageElement = `<div class="message receiver">
  <div class="user-name">${data.userSent}</div>
  <p class="message-content">${data.messageToClient}</p>
</div>`;
parentContainer.insertAdjacentHTML("beforeend", receivedMessageElement);
getColorForSender();
});


socket.on("newUser",(newUsername)=>{
  createUserList(newUsername,false);
});

socket.on("removeUser",(userName)=>{
  const elementToDelete = document.getElementById(userName);
  const elementToDeleteHr = document.getElementById(userName + "-hr");
  if(elementToDelete){
    elementToDelete.remove();
  }
  if(elementToDeleteHr){
    elementToDeleteHr.remove();
  }
});

function createUserList(userName, isCurrentUser) {
  const elementExists = document.getElementById(userName);
  if(!elementExists){
    const parentContainer = document.getElementById("people-list-id");

  // Create the element using template literals

  const connectedUserElement = `
  <div class="connected-user" id="${userName}">
    <div>
      <img class="profile-image" src="assets/male.jpg" alt="">
    </div>
    <h3>${userName} ${isCurrentUser ? "(you)" : ""}</h3>
  </div>
  <hr id="${userName}-hr">
`;

  parentContainer.insertAdjacentHTML("beforeend", connectedUserElement);

  }
  }

function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null; // Cookie not found
}

function sendMessage() {
  const messageBox = document.getElementById("userMessage");
  const userMsg = messageBox.value;
  socket.emit("sendingMsg", { userSent: username, msg: userMsg });
  const parentContainer = document.getElementById("messagesId");
  const sentMessageElement = `<div class="message sender">
  <p class="message-content">${userMsg}</p>
</div>`;
parentContainer.insertAdjacentHTML("beforeend", sentMessageElement);
messageBox.value = "";
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getColorForSender(){
  // Apply random colors to user names
const lastUserName = document.querySelector('.message.receiver:last-child .user-name');
if (lastUserName) {
  const randomColor = getRandomColor();
  lastUserName.style.backgroundColor = randomColor;
  lastUserName.style.color = 'white'; // Ensure contrast with background color
}
}


function logoutFunction(){
  socket.emit("logout",username);
  document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `socketid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.href = "";
}