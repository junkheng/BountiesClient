const express = require('express')
const app = express()
const port = process.env.port || 3001

const indexRouter = require('./routes/index')
const todoRouter = require('./routes/todo/todoRoutes')
const loginRouter = require('./routes/loginRoutes/loginRoutes')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

// route paths must be after all the above config are set in place
app.use('/', indexRouter)
app.use('/todo', todoRouter)
app.use('/login', loginRouter)

app.listen(port, () => console.log(`Listening in port ${port}`))
