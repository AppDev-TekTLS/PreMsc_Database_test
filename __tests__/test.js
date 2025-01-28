import { io as ioc } from "socket.io-client";
import { io as ioTest, server as serverTest } from '../index.js'
import MessageDB from "../models/message.js";
import mongoose from "mongoose";

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    mongoose.connect(global.__MONGO_URI__, {
        dbName: 'step1'
    });
    const httpServer = serverTest
    io = ioTest;
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = ioc(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    mongoose.disconnect()
    io.close();
    clientSocket.disconnect();
  });

  it("Save message in database", (done) => {
    clientSocket.emit("send", "message test");
    setTimeout(async () => {
      const result = await MessageDB.findOne({message: "message test"}, { _id: 0, message: 1})
      expect(JSON.stringify(result)).toEqual(JSON.stringify({ message: "message test" }))
      done()
    }, 500)
  }, 2000);

  test("Send message", (done) => {
    clientSocket.on("messages", (data) => {
      expect(JSON.stringify(data)).toEqual(JSON.stringify(["message test", "message test 2"]))
      done()
    })
    clientSocket.emit("send", "message test 2");
    clientSocket.emit("getMessages");
  }, 2000);

});