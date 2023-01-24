const express = require('express') 
const app = express() 
const port = 4005
require('dotenv').config()
const routes = require('./src/routes/index')
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({
origin: ['http://127.0.0.1:5173']
}));



app.get('/', (req, res) => { 
    res.send({
        datos: 'Testing',
    })
    console.log('Hola')
})

app.use(routes)

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
