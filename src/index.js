import express from 'express'
import cors from 'cors'

import connectDB from './db/mongoose.js'
connectDB()

import entryRouter from './routes/entry.js'
import mailRouter from './routes/mail.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', entryRouter)
app.use('/api', mailRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})