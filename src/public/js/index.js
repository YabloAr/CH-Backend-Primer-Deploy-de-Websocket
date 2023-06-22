
//simulamos la conexion de un cliente.
const socket = io()

let user = ''
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Ingresa tu nombre por favor',
    input: 'text',
    inputValidator: (value) => {
        return !value && "Se requiere un nombre para continuar!!"
    },
    allowOutsideClick: false
}).then(result => { user = result.value })


console.log(user)

socket.emit('newUserJoined', data => {
    if (!user) return
    Swal.fire({
        text: 'Nuevo usuario conectado.',
        toast: true,
        position: 'top-right'
    })
})


chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs')
    console.log("Data de index.js")
    console.log(data)
    let messages = ""
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`
    })
    log.innerHTML = messages
})

console.log("index js logueando")