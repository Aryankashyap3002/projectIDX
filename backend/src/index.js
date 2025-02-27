import express from 'express';
import cors from 'cors'
import { createServer } from 'node:http';
import { PORT } from './config/serverConfig.js'
import { Server } from 'socket.io';
import apiRouter from './routes/index.js'
import chokidar from 'chokidar';
// import path from 'node:path';
import { handleEditorSocketEvents } from './socketHandler/editorHandler.js';
// import queryString from 'query-string';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



app.get('/ping', (req, res) => {
    return res.json({message: "pong"});
})

app.use('/api', apiRouter);

const editorNamespace = io.of('/editor');

editorNamespace.on("connection", (socket) => {
    console.log("editor connected");

    let projectId = socket.handshake.query.projectId; // projectId from backend coming through socket pipeline


    if(projectId) {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true, // keeps the watcher in running state till the time app is running
            awaitWriteFinish: {
                stabilityThreshold: 2000, // ensure the stability of files before triggering the event
            },
            ignoreInitial: true, // ignore the intial files in the directory

        });

        watcher.on("all", (event, path) => {
            console.log(path, event);
        })
    }

    handleEditorSocketEvents(socket, editorNamespace); 
  
    // socket.on('disconnect', async () => {
    //     await watcher.close();
    //     console.log("editor disconnected");
    // })

})

server.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
})
