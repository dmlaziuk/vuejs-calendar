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

let renderer

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8')
  let marker = '<!--APP-->'
  if (renderer) {
    renderer.renderToString({}, (err, html) => {
      if (err) {
        console.log(err)
      } else {
        res.send(template.replace(marker, `<script>var __EVENTS__ = ${serialize(events)}</script>\n${html}`))
      }
    })
  } else {
    res.send('<p>Awaiting compilation...</p>')
  }
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
  require('./webpack-server-compiler').init((bundle) => {
    let renderer = require('vue-server-renderer').createBundleRenderer(bundle)
  })
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})
