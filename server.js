//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);



//Inicializamos socketio
//const socketio = require("socket.io");
const io = require("socket.io")(servidor, {
  cors: {
    origin: "https://4events.net",
    methods: ["GET", "POST"]
  }
});

//const io = socketio(servidor);

//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  let nombre;
   socket.on("conectado", () => {
       console.log("Usuario conectado")
  //  nombre = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    // socket.broadcast.emit("mensajes", {
    //   nombre: nombre,
    //   mensaje: `n${nombre} ha entrado en la sala del chat`,
    //  });
   });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

servidor.listen(5000, () => console.log("Servidor inicializado"));