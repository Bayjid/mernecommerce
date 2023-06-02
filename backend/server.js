// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config Setup
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });


// Connecting to Database
const connectDatabase = require("./database/connectDatabase");
connectDatabase();

//Cloudinary Config
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Server Listening
const PORT = process.env.PORT || process.env.DEV_PORT;  
const app = require("./app");
const server = app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});