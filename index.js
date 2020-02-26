const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors');
var api = require('./routes/api')
// var auth =require('./routes/auth')

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api', api);
// app.use('/auth', auth);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(process.env.PORT || port, () => {
    console.log(`App running on port ${port}.`)
})


