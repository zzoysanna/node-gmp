import express from 'express'
import { router as userRouter } from './routes/user.routes'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.use('/', userRouter)
