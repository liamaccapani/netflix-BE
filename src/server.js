import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mediasRouter from "./media/index.js";

const corsOptions = []
const PORT = 3001
const server = express()

// ************** GLOBAL
server.use(cors(corsOptions))
server.use(express.json())




// ************** ROUTERS
server.use("/medias", mediasRouter)



// console.table(listEndpoints)

// ************** ERROR HANDLERS
server.use(badRequest)
server.use(forbidden)
server.use(notFound)
server.use(serverError)





server.listen(PORT, () => console.log(`Hi bitch 💅 running on port ${PORT}`))