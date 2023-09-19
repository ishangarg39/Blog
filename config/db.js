const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(connect.connection.name, "->", connect.connection.host.bgMagenta.white);
    }
    catch (error) {
        console.log("Error in database:".bgRed.white, error);
    }
}

module.exports = connectdb;
