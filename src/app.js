// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const programRoutes = require('./routes/programRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');




const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/enrollments', enrollmentRoutes);




// Root route
app.get('/', (req, res) => {
  res.send('Health Management Information System API Running 🚀');
});

module.exports = app;




// {
//   "_id": "680e06f15a49ad7691e2b4a4",
//   "fname": "Mary",
//   "middlename": "Ann",
//   "lname": "Smith",
//   "dob": "1995-06-15T00:00:00.000Z",
//   "gender": "female",
//   "phone": "0712345678",
//   "email": "marysmith@example.com",
//   "nextOfKin": "John Smith",
//   "nextOfKinPhone": "0701234567",
//   "location": "Kisumu",
//   "program_id": null,
//   "health_specialistID": null,
//   "dateEnrolled": "2025-04-27T10:29:05.432Z",
//   "age": 29,
//   "__v": 0,

// }