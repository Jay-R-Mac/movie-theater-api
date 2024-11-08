const express = require('express')
const app = express()
const db = require("../db/connection");
const userRouter = require('../routes/users');
const showRouter = require('../routes/shows');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)
app.use('/shows', showRouter)


module.exports = app