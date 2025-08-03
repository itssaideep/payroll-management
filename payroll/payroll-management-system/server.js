require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// We will create this file later
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB - we will uncomment this later
connectDB();

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple route for testing
app.get('/', (req, res) => {
    res.render('index', { title: 'Payroll Management' }); // We will create index.ejs next
});

// We will add our API routes here later
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/payroll', require('./routes/payrollRoutes'));
app.use('/assets', require('./routes/assetRoutes'));

app.use((req, res, next) => {
    console.log(`Unmatched request: ${req.method} ${req.originalUrl}`);
    next();
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
