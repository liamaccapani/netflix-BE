import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mediasRouter from "./media/index.js";
import { badRequest, forbidden, notFound, serverError } from "./errorHandlers.js";
import { publicFolder } from "./utilities/fs-tools.js";

const corsOptions = []
const PORT = 3001
const server = express()


// ************** GLOBAL
server.use(cors(corsOptions))
server.use(express.json())
server.use(express.static(publicFolder));



// ************** ROUTERS
server.use("/medias", mediasRouter)



// console.table(listEndpoints)

// ************** ERROR HANDLERS
server.use(badRequest)
server.use(forbidden)
server.use(notFound)
server.use(serverError)





server.listen(PORT, () => console.log(`Server running on port ${PORT}`))