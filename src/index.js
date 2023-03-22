import express from 'express'
import connectDB from './db/mongoose.js'
connectDB()

import entryRouter from './routes/entry.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api', entryRouter)

app.get('/', (req, res) => {
    res.json({
        message : "How are you"
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})