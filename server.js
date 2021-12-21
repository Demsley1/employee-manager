const express = require('express');
const db = require('./db/connection')
const PORT = process.env.PORT || 3001;
const app = express();


db.connect(err => {
    if(err)throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    })
})
