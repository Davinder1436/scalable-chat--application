import { RedisClientType } from "redis";

const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const {createClient,RedisClientType} = require("redis")

 async function init(){

    const httpServer = http.createServer();
    const PORT = process.env.PORT|| 8000;

    const publisher = createClient({
        
      });
      publisher.on('error', (err:any) => console.error('Redis Publisher Error', err));
      
      // Subscriber
      const subscriber = createClient({
        
      });
      subscriber.on('error', (err:any) => console.error('Redis Subscriber Error', err));
      
      // Connect clients
      await publisher.connect();
      await subscriber.connect();
      
    subscriber.subscribe("MESSAGES")
 
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", async (socket:any) => {
        console.log("connected",socket.id)
        socket.on("message", async(data:any) => {
            await publisher.publish("MESSAGES", JSON.stringify(data))
            console.log("message",data)
            
        })

    })
    subscriber.on('message', (channel:any, message:any) => {
        if(channel === "MESSAGES"){
            io.emit("message", JSON.parse(message))}
    })


    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

        }

init();


