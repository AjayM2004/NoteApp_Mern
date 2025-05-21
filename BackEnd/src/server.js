// Import required modules
import express from 'express';
import NotesRoutes from './Routes/NotesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import rateLimiter from './Middleware/RateLimiter.js';
// Load environment variables from .env file
dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001; // Set the port to the value in .env or default to 5001
// CORS middleware (Cross-Origin Resource Sharing. Allows requests from different origins)
// This is important for allowing your frontend to communicate with your backend
if(process.env.NODE_ENV !== "production"){
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

// Middleware to parse JSON request bodies
app.use(express.json());
// Rate limiting middleware
app.use(rateLimiter);


// our simple custom middleware
// app.use((req,res,next)=>{
//   console.log(`Req method is ${req.method} and url is ${req.url}`);;
//   next();
// })
// Use NotesRoutes for all /api/notesapp endpoints
app.use("/api/notesapp", NotesRoutes);
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "dist", "index.html"));
  });
}


// Start the server on the specified port
// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(1); // Exit the process with failure
});

// mongodb+srv://AjayM:Ajay*2004-08-11@cluster0.zozhljk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
