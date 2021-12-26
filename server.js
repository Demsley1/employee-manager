const express = require('express');
const db = require('./db/connection')
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const directory = require('./public/lib/directory')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use(express.static('directory'));

db.connect(err => {
    if(err)throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    })
})
