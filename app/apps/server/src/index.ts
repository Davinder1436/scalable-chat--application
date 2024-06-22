const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

 async function init(){

    const httpServer = http.createServer();
    const PORT = process.env.PORT|| 8000;

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket:any) => {
        console.log("connected",socket.id)
        socket.on("message", (data:any) => {
            io.emit("message",data)
        })
    })


    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })


}
init()