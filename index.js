import express from "express";
import {Server} from 'socket.io';
import { createServer } from 'node:http';
import bodyParser from "body-parser";
import UserFactory from "./objects/UserFactory";
import MessageDB from "./models/message";

const userFactory = new UserFactory;
const app = express()
export const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: `http://localhost:5173`,
    }
});

app.use(bodyParser.json())

io.on('connection', (socket) => {
    userFactory.addUser(socket.id)

    // TODO: Vous devez stoker les messages envoyer par le socket
    socket.on("send", async (message) => {
        // ....
        io.emit("message", message);
    })

    // TODO: Vous devez récupérer tous les messages et puis les envoyer au socket
    socket.on("getMessages", () => {
        // ....
        socket.emit("messages", [])
    })

    socket.on('disconnect', () => {
        const users = userFactory.removeUser(socket.id);
        if (users) {
            console.log('user disconnected', users);
        } else {
            console.log('user disconnected');
        }
    });
});

const main = async () => {
    server.listen(8081, () => {
        console.log(`Example app listening on port 8081`)
    })
}

if (process.env.NODE_ENV !== "test") {
    main()
}