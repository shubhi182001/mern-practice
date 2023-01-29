const mongoose = require("mongoose");

const DB = process.env.DATABASE;


mongoose.connect(DB).then(() => {
    console.log("connection done");
}).catch((e) => {
    console.log(e);
})