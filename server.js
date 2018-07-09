const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
// tell the express app to listen on port 8000, always put this at the end of your server.js file
// this is the line that tells our server to use the "/static" folder for static content
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '\\views');
app.set('view engine', 'ejs');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(1337);
const io = require('socket.io')(server);
count = 0;
io.on('connection', function (socket) { //2
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });
  socket.on('red',function(){
    console.log("server red");
    io.emit('change_red');
  });
  socket.on('blue',function(){
    console.log("server blue");
    io.emit('change_blue');
  });
  socket.on('green',function(){
    console.log("server green");
    io.emit('change_green');
  });
  //epic button
  // socket.on('click',function(){
  //   count++;
  //   socket.emit('count',count);
  // })
  // socket.on('reset',function(){
  //   count = 0;
  //   socket.emit('count',count);
  // })
  //survey form
  //var myData = [];
  // socket.on('name', function (data) { //socket ping-pong
  //   var index = 0;
  //   console.log(data);
  //   myData[index] = data;
  //   socket.on('location', function (data) {
  //     index++;
  //     myData[index] = data;
  //     console.log(data);
  //     socket.on('language', function (data) {
  //       index++;
  //       myData[index] = data;
  //       console.log(data);
  //       socket.on('comment', function (data) {
  //         index++;
  //         myData[index] = data;
  //         console.log(data);
  //         socket.emit('survey', { arr: myData });
  //         console.log(myData);
  //       })
  //     })
  //   });
  // });
});

app.get("/", function (req, res) {
  res.render("colors.ejs")
});

// app.post("/survey",function(req,res){

//     res.redirect("/survey");
// })

// app.get("/survey",function(req,res){

//     res.render("submit.ejs")