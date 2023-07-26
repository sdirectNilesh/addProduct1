const express = require('express');
const app = express();
require('./Database/db');
const path = require("path");
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 5001;

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(cors());


app.use(require('./Routes/route'));


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});