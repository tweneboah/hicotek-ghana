const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.get('/', (req, res) => {
    res.send('HICOTEK GHANA')
})

const PORT = process.env.PORT || 9090;
app.listen(PORT, ()=> {
    console.log(`The server is runing on port ${PORT}`)
})
