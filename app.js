const loop = require('./backnet/BACnetLoop');

var express = require('express');
const path = require('path');

var app = express();

const port = process.env.PORT || '3000';

app.use(express.static('public'));



app.get('/',  (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, (req, res) => {
    console.log(`Server run on port ${port}!`);
});


loop.run();