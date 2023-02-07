const app = require('express')()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const twilio = require('twilio')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const client = twilio(
'ACCOUNT SID FROM TWILIO CONSOLE',
'AUTH TOKEN FROM TWILIO CONSOLE'
)

// Other code will go here
app.post('/verify', (req, res) => {
client.verify
.services('VERIFY SERVICE SID FROM TWILIO CONSOLE')
.verifications
.create({ to: req.body.number, channel: 'sms' })
.then(verification => {
res.render('check', { requestId: verification.sid })
})
.catch(error => {
res.render('index', { message: error.message })
})
})

app.post('/check', (req, res) => {
client.verify
.services('VERIFY SERVICE SID FROM TWILIO CONSOLE')
.verificationChecks
.create({ to: req.body.requestId, code: req.body.code })
.then(verification_check => {
if (verification_check.status === 'approved') {
res.render('success')
} else {
res.render('index', { message: 'Verification failed' })
}
})
.catch(error => {
res.render('index', { message: error.message })
})
})

app.listen(3000)