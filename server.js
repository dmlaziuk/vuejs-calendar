require('dotenv').config({ silent: true })

const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const http = require('http')
const moment = require('moment-timezone')
const serialize = require('serialize-javascript')

moment.tz.setDefault('UTC')

let events = [
  { description: 'Event 1', date: moment() },
  { description: 'Event 2', date: moment() },
  { description: 'Event 3', date: moment() }
]

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8')
  let marker = '<!--APP-->'
  res.send(template.replace(marker, `<script>var __INIT__ = ${serialize(events)}</script>`))
})

app.use(require('body-parser').json())
app.post('/add_event', (req, res) => {
  events.push(req.body)
  res.sendStatus(200)
})

const server = http.createServer(app)

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload')
  const reloadServer = reload(server, app)
  require('./webpack-dev-middleware').init(app)
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})
