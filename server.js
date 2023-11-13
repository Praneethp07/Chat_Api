const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT||3000;
const chatroutes = require('./routes/route');
app.use(bodyparser.json());
app.use('/api/organizations/',chatroutes);
var cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
    res.json({
        Authentication:"login"
    });
});


server.listen(PORT, () => {
    console.log(`server running on port:http://localhost:${PORT}`);
});
module.exports = server;
//author: praneeth