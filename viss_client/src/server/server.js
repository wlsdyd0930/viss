var express = require('express');
var app = express();

const HTTPServer = app.listen(8080, function () {
    console.log("server is opened at 8080 : WebSocket")
});

var WS = require('ws')

var WSS = new WS.Server(
    {
        server: HTTPServer,
    }
)

WSS.on('connection', (ws, req) => {
    console.log("client connected")

    ws.on('message', (msg) => {
        var rec=JSON.parse(msg)
        console.log("receive msg FROM CLIENT : ", rec)
        ws.send(`SERVER : action is ${rec.action}, path is ${rec.path}, reqId is ${rec.reqId}`)
    })

    ws.on('error', (err) => {
        console.log("error")
    })

    ws.on('close', () => {
        console.log("end")
    })

})