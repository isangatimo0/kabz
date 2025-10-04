# KABZ Rental Management System - Architecture Plan

## System Overview
KABZ is a full-stack rental management system built with React (frontend), Node.js/Express (backend), and PostgreSQL (database). It supports multiple user roles and comprehensive property management features.

## Technology Stack
- **Backend**: Node.js, Express, Prisma (ORM), PostgreSQL
- **Frontend**: React (Create React App), TailwindCSS, Redux Toolkit
- **Authentication**: JWT with refresh tokens
- **Deployment**: Docker, AWS

## Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend (React)"
        A[React App] --> B[Redux Toolkit]
        A --> C[TailwindCSS]
        A --> D[Recharts for Charts]
    end

    subgraph "Backend (Node.js/Express)"
        E[Express Server] --> F[JWT Auth]
        E --> G[RBAC Middleware]
        E --> H[Prisma ORM]
        E --> I[Winston Logging]
        E --> J[Zod Validation]
        E --> K[Swagger Docs]
    end

    subgraph "Database (PostgreSQL)"
        L[Prisma Schema] --> M[Users Table]
        L --> N[Properties Table]
        L --> O[Tenants Table]
        L --> P[Leases Table]
        L --> Q[Payments Table]
        L --> R[Maintenance Requests Table]
        L --> S[Audit Logs Table]
    end

    subgraph "External Services"
        T[Email/SMS Notifications]
        U[AWS Deployment]
    end

    A --> E
    E --> H
    H --> L
    E --> T
    E --> U
```

## User Roles
- Admin: Full system access
- Property Manager: Manage properties, tenants, leases
- Landlord: View reports, manage owned properties
- Tenant: View own info, submit maintenance requests

## Core Modules
1. User Management & Authentication
2. Property Management
3. Tenant Management
4. Lease & Rental Agreements
5. Rent Collection & Payments
6. Maintenance Requests
7. Financial Reporting
8. Notifications
9. Audit & Logging

## Development Phases
The implementation will follow the todo list provided, starting with backend scaffolding and progressing through each module.