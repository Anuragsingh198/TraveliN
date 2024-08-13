const express = require('express');
const dotenv = require('dotenv');
const roomRouter = require('./routers/roomRouter'); 
const mongoose  = require('mongoose');
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next();
});

app.use(express.json({ limit: '10mb' }));

app.use('/room', roomRouter);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Not Found' });
});

const startServer = async () => {
    try {

        // Connect to MongoDB here if needed
        mongoose.connect(process.env.MONGO_CONNECT); 
        // mongoose.connect('mongodb+srv://travel:travel12345@ecommercewebsite.2k28whz.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceWebsite')
        console.log('mongo db connectd  successfully');
        app.listen(port, () => console.log(`Server is running on port: ${port}`));
    } catch (error) {
        console.error(error);
    }
};

startServer();
