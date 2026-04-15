//what does this file do? It is the main entry point for the backend server application. It initializes the Express app, connects to the database, starts the server, and handles graceful shutdown on termination signals.

import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { dbConnect, dbDisconnect } from "./loaders/dbLoader.js";

const app = createApp();

await dbConnect();

const server = app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`);
});

async function shutdown() {
  server.close(async () => {
    await dbDisconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
