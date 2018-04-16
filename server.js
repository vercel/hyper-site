const { parse } = require('url')
const next = require('next')
const router = require('path-match')()

const routes = [
  {
    page: '/plugin',
    match: router('/plugins/:id'),
    query: params => ({ id: params.id })
  },
  {
    page: '/source',
    match: router('/plugins/:id/source'),
    query: params => ({ id: params.id })
  }
]

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

async function main(req, res) {
  const parsedUrl = parse(req.url, true)

  for (const route of routes) {
    const params = route.match(parsedUrl.pathname)
    if (params) {
      return app.render(req, res, route.page, route.query(params))
    }
  }

  return handle(req, res, parsedUrl)
}

async function setup(handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
