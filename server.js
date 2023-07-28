const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path');
const port = 8080;

app.use(express.static(path.join(__dirname,'src')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src','index.html'));
})

http.listen(port,()=>{
    console.log("App is listening");
})

