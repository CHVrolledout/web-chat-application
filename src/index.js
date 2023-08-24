const username = getCookieValue("username");
if(username){
  window.location.href = "chat.html";
}
const socket = io("ws://192.168.29.218:8080");

socket.on("connect", () => {
  console.log("Socket.IO connection established.");
});

socket.on("message", (message) => {
  console.log("Received message from server:", message);
  // Handle the received message as needed
});

socket.on("disconnect", (reason) => {
  console.log("Socket.IO connection closed.", reason);
});

socket.on("error", (error) => {
  console.error("Socket.IO error:", error);
});

const textField = document.getElementById("usernameInput");
const emptyWarning = document.getElementById("emptyWarning");
const submitButton = document.getElementById("myButton");

textField.addEventListener("input", function () {
  if (textField.value.trim() === "") {
    emptyWarning.style.visibility = "visible";
    submitButton.disabled = true;
  } else {
    emptyWarning.style.visibility = "hidden";
    submitButton.disabled = false;
  }
});

function loginFunction(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("usernameInput");
  const username = usernameInput.value;
  document.cookie = `username=${username}`;
  document.cookie = `socketid=${socket.id}`;
  socket.emit("user-info", { username: username, socketId: socket.id });
  window.location.href = "chat.html";
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