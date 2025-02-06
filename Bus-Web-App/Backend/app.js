const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const url = "mongodb://localhost/ticketBookingDB"; // Change if using MongoDB Atlas
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("Connected to MongoDB..."));

// Routes
const busesRouter = require("./routers/buses");
const passengerRouter = require("./routers/passenger");
const contactRouter = require("./routers/contact"); // Add this

app.use("/bus", busesRouter);
app.use("/passenger", passengerRouter);
app.use("/contact", contactRouter); // Add this

app.listen(9000, () => {
    console.log("Server started on port 9000");
});
