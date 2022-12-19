require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries');
const verifyToken = require("./middleware");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/login', db.login)
app.get('/getAllStudent', verifyToken, db.getAllStudent)
app.get('/getStudentByTeacher/:id_teacher', verifyToken, db.getStudentByTeacher)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})