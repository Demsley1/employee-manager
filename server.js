const express = require('express');
const db = require('./db/connection')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ entended: false }));
app.use(express.json());
app.use(express.static('./public'));

app.use()

db.connect(err => {
    if(err)throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    })
})
