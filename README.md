# Appointment Scheduling System

Appointment Scheduling System is a full-stack web application for managing customer appointments, queue handling, and scheduling workflows.

The project includes a React front end for customers and administrators, along with an Express and MySQL back end API powered by Sequelize.

The system supports:

- Customer appointment booking
- Admin schedule and queue management
- Time slot configuration
- Authentication and request tracking
- Ticket generation and appointment workflows

---

## Project Structure

```text
appointment-scheduling-system/
│
├── front-end/     # React client application
├── back-end/      # Express + MySQL API
└── README.md
```

---

## Tech Stack

### Front End

- React
- React Router
- Redux
- Tailwind CSS

### Back End

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

---

## Prerequisites

Before running the project, install:

- Node.js (recommended 16+)
- npm
- MySQL
- Git

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/zahrajafarifard/Appointment-scheduling-system
cd appointment-scheduling-system
```

---

## Front-End Setup

```bash
cd front-end
npm install
```

Create a `.env` file inside `front-end/` if required.

Example:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run the front end:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

---

## Back-End Setup

```bash
cd back-end
npm install
```

Create a `.env` file inside `back-end/`.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=appointment_system
JWT_SECRET=your_secret
```

---

## Database Setup

### Run migrations

```bash
npx sequelize-cli db:migrate
```

### Run seeders

```bash
npx sequelize-cli db:seed:all
```

### Undo all seeders

```bash
npx sequelize-cli db:seed:undo:all
```

---

## Running the Back End

```bash
npm start
```

The default configuration uses `nodemon` for automatic server restarts during development.

---

## Appointment Scheduling Workflow

Before customers can book appointments, the administrator must first configure the scheduling system through the admin dashboard.

This setup includes:

- Creating available appointment dates
- Defining available time slots
- Managing queue capacity
- Activating or disabling schedules

Once schedules are configured, customers can:

- Browse available appointment dates
- View open time slots
- Submit booking requests
- Join appointment queues

If schedules or time slots are not configured by the administrator, customers will not see available booking options.

---

## Features

### Customer Features

- Register and authenticate
- Browse available schedules
- Book appointments
- Join queues
- Track request status
- Receive generated tickets

### Admin Features

- Manage schedules and time slots
- Control queue availability
- Manage appointment requests
- Handle customer workflows
- Monitor active queues
- Configure scheduling settings

---

## Build Front End for Production

```bash
cd front-end
npm run build
```

Production files will be generated inside:

```text
front-end/build/
```

---

## Seed Data

The project includes Sequelize seeders for initializing system data such as:

- Admin accounts
- Appointment categories
- Request types
- Default scheduling data

Seeder files are located in:

```text
back-end/seeders/
```

---

# Authors

- Zahra Jafarifard
