# KABZ Rental Management System

A full-stack rental management system built with React, Node.js, Express, and PostgreSQL.

## Features

- User authentication with JWT
- Role-based access control (Admin, Property Manager, Landlord, Tenant)
- Property, tenant, lease, and payment management
- Maintenance request tracking
- Financial reporting with charts
- Email/SMS notifications
- Audit logging
- Docker containerization
- CI/CD with GitHub Actions

## Tech Stack

- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Frontend**: React, Redux Toolkit, TailwindCSS
- **DevOps**: Docker, GitHub Actions, AWS

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL
- Docker (optional)

### Backend Setup

1. cd backend
2. npm install
3. Update .env with your database URL and secrets
4. npx prisma migrate dev
5. npx prisma generate
6. npm run dev

### Frontend Setup

1. cd frontend
2. npm install
3. npm start

### Docker Setup

1. docker-compose up --build

## API Documentation

Available at /api-docs when backend is running.

## Deployment

Push to main branch to trigger CI/CD deployment to AWS.