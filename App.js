// const express =require('express');
// const http= require('http');
// const {Server}=require('socket.io');

// const app = express();
// const server =http.createServer(app);
// const io =new Server(server);

// //package to install npm i init ,npm i nodemn express env ejs, npm i socket.io
// app.set('view engine','ejs');
// app.use(express.static('./public'));

// //post request middleware
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// // showing app on frontend
// app.get('/',(req,res)=>{
//     res.render('index')
// });
// // socket in handlers
// io.on('connection',(socket)=>{
//     console.log("A socket or A USER IS ATTACHED");
//     socket.on("message",(message)=>{
//         io.emit('message',message);
//     });
// });

// server.listen(3000,()=>{
// console.log("Server is running on port 3000");
// });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chatMessage', (msg) => {
        console.log('Message:', msg);
        // Send message to everyone except sender
        socket.broadcast.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});