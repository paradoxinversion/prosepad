import express from 'express'
import docsRouter from './api/docs'
import path from 'path'

const app = express()
app.use(express.json())

app.use('/docs', docsRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
const HOST = '127.0.0.1'

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Backend listening at http://${HOST}:${PORT}`)
  })
}

export default app
