const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
var path = require('path');
io.on('connection', (socket) => {
    console.log('Client Connected')
    
    socket.on('send_slice', () => {
        get_data(socket)
    })
 });
server.listen(5000);

function get_data(socket) {
    var readStream = fs.createReadStream('hello.mp3')
    readStream.on('open',() => {
        console.log('readstrem open')
    })

    readStream.on('ready',() => {
        console.log('readstrem ready')
    })
    
    readStream.on('close',(data) => {
        console.log('readstrem close')
        socket.emit('end_of_file')
    })

    readStream.on('error',() => {
        console.log('readstrem error')
    })

    readStream.on('data', chunk => {
        console.log('readstrem chunks data')
        socket.emit('receive_slice', chunk)
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.listen(4000)