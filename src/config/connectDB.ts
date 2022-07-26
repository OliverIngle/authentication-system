import mongoose from "mongoose";

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

let uri = `mongodb+srv://oliveringle:${MONGODB_PASSWORD}@authentication-system.fr9v3kk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);
let db = mongoose.connection;
db.on("connected", _ => console.log("SUCCESS: Connected to database."));
db.on("error", err => console.error("ERROR: Database connection failed." + err));

export default db;