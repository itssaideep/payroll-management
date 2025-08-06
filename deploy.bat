@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing files...
git commit -m "Initial commit: Payroll Management System with Asset Inventory"

echo Adding remote origin...
git remote add origin https://github.com/itssaideep/payroll-management.git

echo Fetching remote changes...
git fetch origin

echo Creating and switching to inventory branch...
git checkout -b inventory

echo Pushing to inventory branch...
git push -u origin inventory

echo.
echo Deployment complete!
echo.
echo To merge the inventory branch into main:
echo 1. Go to your GitHub repository at https://github.com/itssaideep/payroll-management
echo 2. Create a pull request from the inventory branch to the main branch
echo 3. Review and merge the pull request
echo.
