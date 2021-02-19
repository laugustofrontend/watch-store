import { createServer, Response } from 'miragejs'

if (process.env.NODE_ENV === 'development') {
  require('@/miragejs/server').makeServer()
}

if (window.Cypress) {
  const otherDomains = []
  const methods = ['get', 'post', 'patch', 'post', 'delete']

  createServer({
    routes() {
      for (const domain of ['/', ...otherDomains]) {
        for (const method of methods) {
          this[method](`${domain}*`, async (schema, request) => {
            const [status, headers, body] = await window.handleFromCypress(
              request
            )

            return new Response(status, headers, body)
          })
        }
      }
    },
  })
}
