import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mediasRouter from "./media/index.js";
import { join } from "path";
import { badRequest, forbidden, notFound, serverError } from "./errorHandlers.js";

const server = express();

const publicFolder = join(process.cwd(), "public")

const whiteList = [process.env.FE_DEV_URL, process.env.FE_DEPLOYED_URL];
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: function (origin, next) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error(`Forbidden origin: ${origin}`));
    }
  },
};

// ************** GLOBAL
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.static(publicFolder));

// ************** ROUTERS
server.use("/medias", mediasRouter);

// console.table(listEndpoints)

// ************** ERROR HANDLERS
server.use(badRequest);
server.use(forbidden);
server.use(notFound);
server.use(serverError);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
