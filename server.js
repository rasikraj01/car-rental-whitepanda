const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    
})