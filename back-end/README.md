---

# 📘 `back-end/README.md`

```markdown
# Appointment Scheduling System — Back End

This directory contains the Express-based back-end API for the Appointment Scheduling System.

It handles authentication, scheduling logic, queue management, time slots.

For full system overview and setup instructions, please refer to the root `README.md`.

---

# Features

## Core Features

- User authentication (JWT)
- Appointment scheduling system
- Queue management
- Time slot configuration
- Request handling system
- File upload support

## Admin Features

- Configure schedules
- Manage appointment availability
- Control queue capacity
- View and manage requests

## Customer Features

- View available schedules
- Book appointments
- Join queues
- Track request status

---

# Project Structure

```text
back-end/
│
├── index.js           # Main server entry point
├── db.js              # Database connection
├── controller/        # Business logic controllers
├── models/            # Sequelize models
├── routes/            # API routes
├── shared/            # Middleware & helpers
├── upload/            # File upload utilities
├── seeders/           # Initial database seed data
└── package.json
```

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

## Prerequisites

- Node.js (16+ recommended)
- npm
- MySQL database

## Install

```bash
cd back-end
npm install
```

## Run

```bash
npm start
```

Server runs on:

```text
http://localhost:4000
```

## 🗄️ Database Setup

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

## 🌱 Seed Data

The project uses Sequelize seeders to initialize default database records such as:

- Admin accounts
- Request categories
- Request types
- Initial system data

Seeder files are located in:

```text
seeders/
```

## 📌 Appointment Scheduling Workflow

Before customers can book appointments, the administrator must first configure the appointment scheduling system through the admin panel.

This setup typically includes:

- Creating available appointment dates
- Defining time slots and working hours
- Managing queue capacity and availability
- Activating or disabling schedules for specific days

Once schedules are configured, customers can:

- View available appointment dates
- Check open time slots
- Submit booking requests
- Join the queue for available schedules

If no schedules or slots have been configured by the administrator, customers will not see available booking times in the application.

## Author

Zahra Jafarifard
