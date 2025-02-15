const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')


app.use(cors());
app.options('*', cors())



const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')



//middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));



//Routers
app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)




mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Database connection is ready...")
})
.catch((err)=>{
    console.log(err.message)
})


app.listen(3000,()=>{
    console.log("server running now")
})