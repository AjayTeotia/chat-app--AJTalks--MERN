// Packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

//Socket
import { app, server } from "./socket/soket.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routers.js";
import userRoutes from "./routes/user.routers.js";

// Connection to MongoDB
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

// PORT Connection
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware to parse incoming JSON requests and make the parsed data available in req.body
app.use(express.json());

// Middleware to parse cookies from the HTTP request and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Mount the authRoutes middleware at the /api/auth path
app.use("/api/auth", authRoutes);

// Mounts the messageRoutes middleware at the "/api/messages" path.
app.use("/api/messages", messageRoutes);

// Any requests to "/api/users" will be handled by the routes defined in userRoutes.
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Testing Port
/*app.get("/", (req, res) => {
    res.send("Hello, world!");
}); */

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`SERVER IS LISTENING TO PORT: ${PORT}`);
});
