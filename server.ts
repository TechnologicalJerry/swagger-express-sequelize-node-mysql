import express, { Application } from "express";
import Server from "./src/index";

const server: Application = express();
const serverApp: Server = new Server(server);
const PORT: number = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 9000;

server
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port:${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
