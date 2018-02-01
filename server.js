require('dotenv').config({ silent: true })

const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const http = require('http')
const moment = require('moment-timezone')
const serialize = require('serialize-javascript')

moment.tz.setDefault('UTC')

let renderer

let events = [
  { description: 'Event 1', date: moment() },
  { description: 'Event 2', date: moment() },
  { description: 'Event 3', date: moment() }
]

app.use(require('body-parser').json())

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8')
  let marker = '<!--APP-->'
  if (renderer) {
    renderer.renderToString({ events }, (err, html) => {
      if (err) {
        console.log(err)
      } else {
        res.send(template.replace(marker, `<script>var __EVENTS__ = ${serialize(events)}</script>\n${html}`))
      }
    })
  } else {
    res.send('<p>Awaiting compilation...</p><script src="/reload/reload.js"></script>')
  }
})

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
    let needsReload = (renderer === undefined)
    renderer = require('vue-server-renderer').createBundleRenderer(bundle)
    if (needsReload) {
      reloadServer.reload()
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  let bundle = fs.readFileSync('./dist/node.bundle.js', 'utf-8')
  renderer = require('vue-server-renderer').createBundleRenderer(bundle)
  app.use('/dist', express.static(path.join(__dirname, 'dist')))
}

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})
