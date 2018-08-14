var http = require('http');
//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response
    res.end(); //end the response
}).listen(41269, function(){
    console.log("server start at port 41269"); //the server object listens on port 41269
});