const express = require('express');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 9999;
const cookieParser = require('cookie-parser');
require("./database/conn.database")
const route = require("./router/route.router")
const path = require('path')

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(route)

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log(`Server is live on ${process.env.SERVER_URI}:${PORT}`)
})
