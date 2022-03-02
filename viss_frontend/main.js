var express = require('express')
var fs = require('fs');
const { start } = require('repl');

var app = express()
var port = 3500;

app.use(express.static('static'))
app.use(express.static('test_case/failure'))
app.use(express.static('test_case/success'))
app.use(express.static('test_case_ws/failure'))
app.use(express.static('test_case_ws/success'))

app.listen(port, function(){
    console.log('Server start, Port:' + port)
})

