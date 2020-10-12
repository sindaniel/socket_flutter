const express = require('express')

require('dotenv').config()

const path = require('path')
const publicPath = path.resolve(__dirname, 'public')

const app  = express()
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)


require('./sockets/socket')



app.use(express.static(publicPath))

server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err)

    console.log('servior corriendo', process.env.PORT)
})