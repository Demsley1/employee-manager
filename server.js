const express = require('express');
const db = require('./db/connection')
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
//const Company = require('./public/index');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);
//app.use(Company);

db.connect(err => {
    if(err)throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    })
})
