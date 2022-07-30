const mongoose = require('mongoose');

mongoose.connect(process.env.DBURI).then(res=> console.log("Database is connected Successfully!")).catch(err=>console.log(err));