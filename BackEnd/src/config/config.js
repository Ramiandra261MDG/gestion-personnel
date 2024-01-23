const dotenv = require('dotenv');
dotenv.config();

const config = {
    DB_DBNAME: process.env.DB_DBNAME,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
};

module.exports = config;
