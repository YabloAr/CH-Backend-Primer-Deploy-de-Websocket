import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewRouter from './routes/views.router.js'
//socket io debe ser previamente instalado por npm con el comando 'npm i socket.io',
//previamente debemos contar con express y handlebars ya instalado.
import { Server } from 'socket.io'

const app = express()

//declaramos el servidor principal en el puerto 8080
const httpserver = app.listen(8080, () => console.log("Arribita!"))

//creamos un servidor para sockets, dentro de nuestro servidor principal

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter)


const io = new Server(httpserver)
let messages = []

io.on('connection', socket => {
    console.log("Nuevo cliente conectado.")

    socket.on('message', data => {
        messages.push(data)
        console.log("Data de app.js")
        console.log(data)
        // socket.broadcast.emit('messageLogs', messages)
        io.emit('messageLogs', messages)
    })
})