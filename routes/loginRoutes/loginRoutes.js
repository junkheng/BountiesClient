// /login router
const express = require('express')
const router = express.Router()
const request = require('request')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.post('/', (req, res) => { // only need to put '/' because in app.js file we have set app.use /login and loads this loginRoutes file
    request({
        method: 'POST',
        url: 'http://localhost:8080/user/login',
        form: {
            email: req.body.email,
            password: req.body.password,    
        }
    }, (error, response, body) => {
        if (error) {return console.error('invalid sign in')}
        if (response.statusCode == 400) {
            return res.send('username or password cannot be blank!')
        } else if (response.statusCode == 403) {
            return res.send('incorrect username or password')
        } else if (response.statusCode == 401) {
            return res.send('server rejected')
        }else if (response.statusCode == 200) {
            console.log(body)
            let token = (JSON.parse(body).token)
            console.log(token)
            localStorage.setItem('token', token)
            return res.redirect('/todo')
        } else {
            return res.send('something went horribly wrong and i have no idea')
        }
    })    
})

module.exports = router