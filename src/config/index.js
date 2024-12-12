require("dotenv").config();

const dbURL = process.env.DB_URL;
const secretToken = process.env.JWT_SECRET;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const name = process.env.CNAME;

module.exports = { dbURL, secretToken, apiKey, apiSecret, name };
