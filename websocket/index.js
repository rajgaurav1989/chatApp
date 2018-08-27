var express = require("express") ;
var socket = require("socket.io") ;

var app = express() ;

var server = app.listen(8088, function() {
    console.log("Listening to requests on port 8088");
});

var users = new Set() ;

app.use(express.static('public'));


var io = socket(server);
var userSocketObject = {} ;
var chatInit = true ;

io.on("connection",function (socket) {
    console.log("made socket connection");

    socket.on("initChat",function(data) {
        chatInit = data ;
        if (chatInit){
            socket.emit("initChat",true) ;
        }
        else {
            socket.emit("initChat",false) ;
        }
    });

    socket.on('chat',function(data) {
        io.sockets.emit("chat",data);
    });

    // socket.on('typing',function(data) {
    //     socket.broadcast.emit("typing",data);
    // });

    socket.on('joinChat',function(data) {
        users.add(data) ;
        userSocketObject[data] = socket ;
        io.sockets.emit('joinChat',Array.from(users)) ;
    }) ;

    socket.on('leave' , function (data) {
        users.delete(data) ;
        delete userSocketObject[data] ;
        socket.emit('leave',data) ;
        io.sockets.emit('joinChat',Array.from(users)) ;
    }) ;

    socket.on("privateChat" , function(data) {
        var privateSocket = userSocketObject[data.receiver];
        socket.emit("privateChat",data);
        privateSocket.emit("privateChat",data) ;
    });

    socket.on("getAllUsers",function (data) {
        if (chatInit){
            socket.emit("getAllUsers",{info : Array.from(users),chatStart : true});
            chatInit = false ;
        }
        else {
            socket.emit("getAllUsers",{info : Array.from(users),chatStart : false});
        }
    });

});
