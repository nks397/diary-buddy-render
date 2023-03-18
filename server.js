const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

// Middleware //
app.use(express.json())
app.use(morgan('dev'))

// Connect to DB //

// mongoose.connect('mongodb://localhost:27017/diary-db',
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

// Routes //
app.use('/entries', require('./routes/entryRouter.js'))

// Error handler //
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// ... other imports
const path = require("path")

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Server listen //
app.listen(5000, () => {
    console.log('The server is running on port 5000')
})