# Payroll Management System

A comprehensive web-based payroll management system built with Node.js, Express, MongoDB, and EJS.

## Features

### Employee Management
- Add new employees with unique employee IDs
- View all employees in the system

### Payroll Management
- Calculate payroll based on days worked
- Automatic calculation of paid leave and overtime
- Deductions for PF, ESI, advances, and asset assignments
- Save payroll records for future reference
- View payroll history for each employee

### Asset Management
- Add and manage company assets
- Assign assets to employees for specific months
- Track asset assignments and quantities
- Edit or delete existing asset assignments
- Automatic inventory management when assigning assets

### Responsive Web Interface
- Clean, user-friendly interface
- Responsive design that works on desktop and mobile devices
- Real-time feedback and error handling

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB installation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/payroll-management-system.git
   cd payroll-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the application:
   ```bash
   node server.js
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Main Dashboard
- **Add New Employee**: Enter employee name and unique ID to add to the system
- **Calculate Payroll**: Select an employee, enter days worked, and specify month/year to calculate payroll
- **Payroll History**: Automatically displays payroll history for the selected employee
- **Asset Inventory**: Navigate to the asset management section

### Asset Management
- **Add New Asset**: Enter asset name, price, and quantity to add to inventory
- **Edit Assets**: Modify existing asset details (name, price, quantity)
- **Assign Assets**: Assign assets to employees for specific months
- **Manage Assignments**: Edit or delete existing asset assignments with quantity controls

## Project Structure

```
payroll-management-system/
├── config/               # Database configuration
├── controllers/          # Route controllers
│   ├── assetController.js    # Asset management logic
│   ├── employeeController.js # Employee management logic
│   └── payrollController.js   # Payroll calculation logic
├── models/               # MongoDB models
│   ├── Asset.js              # Asset data model
│   ├── AssetAssignment.js    # Asset assignment data model
│   ├── Employee.js           # Employee data model
│   └── Payroll.js            # Payroll data model
├── public/               # Static files (CSS, JS, images)
│   ├── css/              # Stylesheets
│   │   ├── style.css     # Main styles
│   │   └── assets.css    # Asset management page styles
│   └── js/
│       └── main.js       # Frontend JavaScript
├── routes/               # Route definitions
│   ├── assetRoutes.js        # Asset management routes
│   ├── employeeRoutes.js     # Employee management routes
│   └── payrollRoutes.js      # Payroll calculation routes
├── views/                # EJS templates
│   ├── index.ejs         # Main dashboard
│   └── assets/
│       └── list.ejs      # Asset management page
├── .env                  # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── README.md             # This file
└── server.js             # Application entry point
```

## API Endpoints

### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create a new employee

### Payroll Management
- `POST /api/payroll/calculate` - Calculate and save payroll for an employee
- `GET /api/payroll/history/:employeeId` - Get payroll history for an employee
- `POST /api/payroll/asset-deduction` - Calculate asset deduction for an employee

### Asset Management
- `GET /assets` - View asset inventory and assignments
- `POST /assets/create` - Create a new asset
- `POST /assets/edit/:id` - Edit an existing asset
- `POST /assets/assign` - Assign an asset to an employee
- `POST /assets/rented/create` - Create a new rented asset assignment
- `POST /assets/rented/edit/:id` - Edit an existing rented asset assignment
- `POST /assets/rented/delete/:id` - Delete a rented asset assignment

## Security Considerations

- Input validation on both client and server sides
- Error handling for database operations
- Proper error messages without exposing sensitive information
- Secure MongoDB connection with environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
