# Appointment Scheduling System — Front End

This directory contains the React-based front-end application for the Appointment Scheduling System.

It provides the customer interface, admin dashboard, queue management system, calendar views.

For full system overview and setup instructions, please refer to the root `README.md`.

---

# Features

## Customer Features

- View available appointment schedules
- Book appointments
- Join queue system
- Track request status

## Admin Features

- Configure appointment schedules
- Manage time slots and availability
- Control queue system
- View and manage customer requests

---

# Project Structure

```text
front-end/
│
├── public/            # Static assets and HTML template
├── src/               # Application source code
│   ├── assets/        # Fonts and Images
│   ├── pages/         # Page-level routes
│   ├── queue/         # Queue management components
│   ├── shared/        # Shared UI components & utilities
│   ├── store/         # Redux state management
│   ├── adminLayout/   # entry routes for admin
│   ├── mainLayout/    # entry routes for customers
│   └── App.js         # Main app entry
├── tailwind.config.js # Tailwind configuration
└── package.json
```

## Tech Stack

- React
- React Router
- Redux
- Tailwind CSS

## Prerequisites

- Node.js (recommended 16+)
- npm (or yarn)

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Build

```bash
npm run build
```

## Environment Variables

Create a .env file in the front-end directory:

```text
REACT_APP_API_URL=http://localhost:5000
```

## Notes

- Admin and customer routes are separated
- Tailwind CSS is used for UI consistency
- Requires backend API to be running

## Author

Zahra Jafarifard
