const MONGODB_ATLAS_EMAIL = "gpto2809@gmail.com";
const DB_USERNAME = "sports-equipments";
const DB_PASSWORD = "9Ix88yOAGhOLUDcA"; 
const REMOTE_DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.wejcug4.mongodb.net/sports-equipments`;
export const LOCAL_DB_URI = "mongodb://localhost:27017/sports-equipments";
export const DB_URI = process.env.npm_lifecycle_event === "start" ? REMOTE_DB_URI : LOCAL_DB_URI;
