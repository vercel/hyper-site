const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const server = express()

  server.get('/plugins/:id', (req, res) => {
    return nextApp.render(req, res, '/plugin', { id: req.params.id })
  })

  server.get('/plugins/:id/source', (req, res) => {
    return nextApp.render(req, res, '/source', { id: req.params.id })
  })

  server.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`▲ Ready On http://localhost:${port}`)
  })
})
