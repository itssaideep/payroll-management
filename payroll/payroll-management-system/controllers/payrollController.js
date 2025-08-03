const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Payroll = require('../models/Payroll');

exports.calculatePayroll = async (req, res) => {
    try {
        const { employeeId, daysWorked, month, year, pfPercentage, esiPercentage } = req.body;
        const advanceDeduction = parseFloat(req.body.advanceDeduction || 0);
        const assetsDeduction = parseFloat(req.body.assetsDeduction || 0);

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const MONTHLY_WORKING_DAYS = 26;
        const perDayPay = 900;

        let workAndLeaveDays = 0;
        let otDays = 0;
        let paidLeavePay = 0;

        if (daysWorked < 21) {
            workAndLeaveDays = daysWorked;
        } else {
            workAndLeaveDays = daysWorked;
            if (daysWorked <= 26) {
                paidLeavePay = (4 * perDayPay).toFixed(2);
            } else {
                otDays = daysWorked - 26;
                workAndLeaveDays = 26;
                paidLeavePay = (4 * perDayPay).toFixed(2);
            }
        }

        const basePay = (workAndLeaveDays * perDayPay).toFixed(2);
        const otPay = (otDays * perDayPay * 1.5).toFixed(2);
        const grossSalary = (parseFloat(basePay) + parseFloat(otPay) + parseFloat(paidLeavePay)).toFixed(2);

        const pfDeduction = ((parseFloat(basePay) + parseFloat(paidLeavePay)) * (parseFloat(pfPercentage) / 100)).toFixed(2);
        const esiDeduction = (grossSalary * (parseFloat(esiPercentage) / 100)).toFixed(2);
        const totalDeductions = (parseFloat(pfDeduction) + parseFloat(esiDeduction) + parseFloat(advanceDeduction) + parseFloat(assetsDeduction)).toFixed(2);
        const netPay = (grossSalary - totalDeductions).toFixed(2);

        const payrollData = {
            employee: employeeId,
            month: parseInt(month),
            year: parseInt(year),
            daysWorked: parseInt(daysWorked),
            basePay: parseFloat(basePay),
            paidLeavePay: parseFloat(paidLeavePay),
            otPay: parseFloat(otPay),
            grossSalary: parseFloat(grossSalary),
            pfDeduction: parseFloat(pfDeduction),
            esiDeduction: parseFloat(esiDeduction),
            advanceDeduction: parseFloat(advanceDeduction),
            assetsDeduction: parseFloat(assetsDeduction),
            totalDeductions: parseFloat(totalDeductions),
            netPay: parseFloat(netPay),
            pfPercentage: parseFloat(pfPercentage),
            esiPercentage: parseFloat(esiPercentage)
        };

        const filter = { employee: employeeId, month, year };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const payroll = await Payroll.findOneAndUpdate(filter, payrollData, options);

        res.status(200).json({
            success: true,
            data: {
                ...payrollData,
                employeeName: employee.name,
                employeeId: employee.employeeId
            }
        });

    } catch (error) {
        console.error('Error in calculatePayroll:', error);
        res.status(500).json({
            success: false,
            message: 'Error calculating payroll',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getPayrollHistory = async (req, res) => {
    try {
        const { employeeId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid employee ID format' 
            });
        }
        
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        const history = await Payroll.find({ employee: employeeId })
            .sort({ year: -1, month: -1 });

        res.status(200).json({ 
            success: true, 
            data: history 
        });
        
    } catch (error) {
        console.error('Error in getPayrollHistory:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
