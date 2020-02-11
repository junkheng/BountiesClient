// /todo router

const express = require('express')
const router = express.Router()
const request = require('request')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => { // only need to put '/' because in app.js file we have set app.use /todo and loads this todoRoutes file
    try {
        app.set('json spaces', 2)
        request('http://localhost:8080/todo', (error, response, body) => {
            let jsonBody = JSON.parse(body)
            res.render('display', {jsonBody})
        })    
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', (req, res) => {
    request.post({
        url: 'http://localhost:8080/todo',
        form: {
            task: req.body.task,
            completed: req.body.completed || false
        },
    }, (error, response, body) => {
        console.log(body)
        res.redirect(302, '/todo')
    })
})

router.post('/delete/:id', (req, res) => {
    console.log(req.params)
    // console.log(req.body)
    request({
        method: 'DELETE',
        url: `http://localhost:8080/todo/delete/${req.params.id}`,
    }, (error, response, body) => {
        console.log(body)
        res.redirect(302, '/todo')
    })
})

module.exports = router