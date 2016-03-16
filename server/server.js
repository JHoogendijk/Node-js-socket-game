var http = require('http');
var io = require("socket.io");
var fs = require('fs');

var server = http.createServer(handler);

function handler(request, response) {
    fs.readFile(__dirname + '/../client/index.html', function(error, data) {
        if(error) {
            console.log(error);
            response.writeHead(404);
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data, 'utf-8');
            response.end();
        }
        console.log("response sent..");
    });
};
server.listen(8000);
console.log("listening on port 8000");

var ios = io.listen(server);

ios.sockets.on("connection", function(socket) {
  console.log("user connected" + socket.id);
  socket.on("message", function (data) {
      console.log(data);
    socket.broadcast.emit("message", data); //to all other connected clients
//    ios.socket.emit("message", data); //to all connected clients
  });
});

var FPS = 1;

var tickLengthMs = 1000 / FPS;
var previousTick = Date.now()
var actualTicks = 0
var gameLoop = function () {
  var now = Date.now()
  actualTicks++
  if (previousTick + tickLengthMs <= now) {

      //Hier komt de code van binnen de loop

      updateClients();
      //Reset loop tijd
    actualTicks = 0
  }
    //Deze code zorgt ervoor dat de CPU niet constant 100% is :)
  if (Date.now() - previousTick < tickLengthMs - 16) {
    setTimeout(gameLoop)
  } else {
    setImmediate(gameLoop)
  }
}

//Deze code stuurt info terug naar de clients en zorgt ervoor
var updateClients() {

}

// begin the loop !
gameLoop()
