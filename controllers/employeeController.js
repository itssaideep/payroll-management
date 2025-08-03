const Employee = require('../models/Employee');

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Public (for now)
exports.createEmployee = async (req, res) => {
    try {
        const { name, employeeId } = req.body;

        const newEmployee = new Employee({ name, employeeId });

        await newEmployee.save();
        res.status(201).json({ success: true, data: newEmployee });
    } catch (error) {
        // Handle potential duplicate employeeId error
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Employee ID already exists.' });
        }
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all employees
// @route   GET /api/employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
