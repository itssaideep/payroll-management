# Payroll Management System

A web-based payroll management system built with Node.js, Express, MongoDB, and EJS.

## Features

- Employee management (add, view employees)
- Payroll calculation with various deductions
- Payroll history tracking
- Responsive web interface

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
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
payroll-management-system/
├── config/               # Database configuration
├── controllers/          # Route controllers
├── models/               # MongoDB models
├── public/               # Static files (CSS, JS, images)
│   └── js/
│       └── main.js       # Frontend JavaScript
├── routes/               # Route definitions
├── views/                # EJS templates
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── README.md             # This file
└── server.js             # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
