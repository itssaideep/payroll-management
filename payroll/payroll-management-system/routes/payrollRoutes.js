const express = require('express');
const router = express.Router();
const { 
    calculatePayroll,
    getPayrollHistory
} = require('../controllers/payrollController');

// Debug middleware to log all requests to payroll routes
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// @route   POST /api/payroll/calculate
// @desc    Calculate payroll for an employee
router.post('/calculate', calculatePayroll);

// @route   GET /api/payroll/history/:employeeId
// @desc    Fetch payroll history for a specific employee
router.get('/history/:employeeId', (req, res, next) => {
    console.log('Payroll history route called with employeeId:', req.params.employeeId);
    next();
}, getPayrollHistory);

module.exports = router;
