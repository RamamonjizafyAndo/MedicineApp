# Dispensary Management Desktop Application

## Overview

The Dispensary Management Desktop Application is a comprehensive tool designed for efficiently managing medical dispensaries. Built with ElectronJS and ReactJS, it offers a user-friendly interface and robust functionality, all integrated with a SQLite database for secure and efficient data management.

## Key Features

- **Inventory Management**: Streamline tracking and management of medical supplies.
- **Patient Records Management**: Maintain secure and organized patient records.
- **Appointment Scheduling**: Manage appointments with an easy-to-use system.
- **Reporting and Analytics**: Access detailed reports for inventory, sales, and patient data.
- **Intuitive User Interface**: Enjoy a clean and responsive user experience.

## Technologies Used

- **ElectronJS**: For creating cross-platform desktop applications.
- **ReactJS**: For building interactive user interfaces.
- **SQLite**: As the database solution for efficient data storage and retrieval.

## Installation and running

Follow these steps to install the application:

1. Clone the repository:
```bash
git clone https://github.com/RamamonjizafyAndo/MedicineApp.git
```
2. Install dependencies
```bash
cd app/
npm i
```
3. Run the application in development
```bash
npm run start
```

## Building and Packaging

For distributing the application:

1. Build the application
```bash
cd app/
npm run build
```       
2. Test the application
```bash
npm run start
```
3. Package the application for distribution
```bash
###For windows###
npm run package-win

###For linux###
npm run package-linux

###For mac###
npm run package-mac
```

These commands create the files to distribute the application

---
