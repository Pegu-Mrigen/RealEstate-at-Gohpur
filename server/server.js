import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import propertyRouter from "./routes/propertyRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import wishlistRouter from "./routes/wishlistRouter.js";
import contactRouter from "./routes/contactRouter.js";
import adminRouter from "./routes/adminRouter.js";
import chatRouter from "./routes/chatRouter.js";

const app = express();

const PORT = 5000;

connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://real-estate-at-gohpur.vercel.app",
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS!"));
//       }
//     },
//   })
// );
const allowedOrigins = [
  "http://localhost:5173",
  "https://real-estate-at-gohpur.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("API Working!");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: { allowedOrigins, methods: ["GET", "POST"] },
  },
});

io.on("connection", (socket) => {
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });
  socket.on("sendMessage", (data) => {
    io.to(data.chatId).emit("recieveMessage", data);
  });
  socket.on("disconnect", () => {});
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
