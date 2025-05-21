const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const projectsRouter = require('./routes/projects');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ['https://joash-portfolio.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Update your MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/bio', require('./routes/bio'));
app.use('/api/about', require('./routes/about'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin/projects', projectsRouter);

// Error Handler

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});