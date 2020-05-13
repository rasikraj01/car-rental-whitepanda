const express = require('express');
const mongoose = require('mongoose');

// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const carRoutes = require('./routes/car');
const bookingRoutes = require('./routes/carBooking');

mongoose.connect(
    `mongodb+srv://admin:admin@cluster0-i1vaa.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
     console.log('Database connected');
    }
)

app.use(express.json());
app.use('/api/', carRoutes);
app.use('/api/', bookingRoutes);

app.get('/', (req, res) => {
    res.send({'test': 'ok'})
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    
})