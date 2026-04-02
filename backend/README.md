# 🚀 Noftify Backend

> A scalable, multi-tenant notification infrastructure backend built with Node.js, Express, and PostgreSQL.

Noftify simplifies external communication by centralizing how applications manage their users, channels, and notifications. Instead of building custom notification logic for every new app, Noftify provides a unified API to manage owner profiles, registered applications, application-specific users, and dynamic notification channels.

This project is built with a strong focus on **clean architecture**, **maintainability**, and **type safety**, making it ready for enterprise-grade scalability.

---

## 🛠️ Tech Stack

- **Framework**: Express.js (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM / Schema Management**: Prisma
- **Dependency Injection**: InversifyJS (`reflect-metadata`)
- **Validation**: Zod
- **Authentication**: JWT (using `jose`)

---

## 🏛️ Architecture & Project Structure

The codebase strictly follows a **Feature-Based Modular Architecture** combined with the **Repository Pattern** and **Dependency Injection (IoC)**, ensuring a clean separation of concerns. The flow goes from Routers to Controllers, down to Services, and finally to Repositories.

```text
src/
├── features/        # Feature modules (app_users, apps, channels, profile)
│   └── apps/
│       ├── apps.controller.ts  # Handles HTTP requests & responses
│       ├── apps.service.ts     # Core business logic layer
│       ├── apps.repository.ts  # Database abstraction (Prisma)
│       ├── apps.router.ts      # Express routing definitions
│       ├── apps.schema.ts      # Zod validation schemas
│       ├── apps.dto.ts         # Data Transfer Objects definition
│       └── apps.mapper.ts      # Entity-to-DTO transformation logic
├── di/              # Dependency Injection container (inversify.config.ts)
├── middleware/      # Global middleware (Auth, Validation payloads)
├── config/          # Environment and application configuration
└── app.ts / server.ts # Application and server entry points
```

---

## ✨ Key Features

- **Multi-Tenant Architecture**: Supports multiple `Profiles`, where each profile can own multiple `Apps`. Each App manages its own scoped `AppUsers` and `Channels`.
- **Inversion of Control (IoC)**: Uses InversifyJS for dependency injection, decoupling implementations and making the system highly testable. Classes retrieve dependencies (like Repositories/Services) via interfaces/types rather than instantiation.
- **Robust Validation**: Zod intercepts incoming requests via middleware (`validateRequestBody`) to ensure type-safe and secure payloads before they ever hit the controllers.
- **RESTful API Design**: Adheres to strict REST principles utilizing nested routing hierarchies (e.g., `/api/apps/:appId/users`) to represent resource relationships.
- **Secure Authentication**: Custom authorization middleware utilizing `jose` for fast, secure cryptographic JWT validation.

---

## 📡 API Documentation (Sample Endpoints)

All endpoints below require authentication via an `Authorization` header.

### 📱 Apps Management (`/api/apps`)
- `POST /` - Create a new app workspace (Expects `createAppSchema` payload)
- `GET /` - Retrieve all apps for the authenticated user profile
- `GET /:appId` - Retrieve details for a specific app
- `PATCH /:appId` - Update an app's configuration (Expects `updateAppSchema` payload)
- `DELETE /:appId` - Remove an app from the profile

### 👥 App Users (`/api/apps/:appId/users`)
- *(Nested Router)* Manages external users bounded directly to a specific application context, mapping their external IDs, contact info, and activity status.

### 📣 Channels (`/api/apps/:appId/channels`)
- *(Nested Router)* Manages notification channel setups (e.g., email, SMS, push providers). Stores provider specifics and raw JSON configuration securely.

---

## 🚀 Setup Instructions

Follow these steps to run the backend locally:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory. You will need a PostgreSQL instance running.
```env
DATABASE_URL="postgresql://username:password@localhost:5432/noftify"
# Add any other required variables defined in src/config
```

### 4. Setup Database
Push the Prisma schema to your PostgreSQL database and generate the Prisma Client for the customized output directory (`src/generated/prisma`):
```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Development Server
Start the server in watch mode using nodemon & ts-node:
```bash
npm run dev
```
The server is successfully running when the foundational REST endpoint (`GET /`) is accessible.

---

## 🌟 Project Highlights (Why this stands out)

1. **Enterprise-Grade Patterns**: Unlike simple MVC boilerplate apps, this backend natively implements Dependency Injection and the Repository pattern. This effectively decouples the data access layer from the HTTP layer, creating a flexible codebase that is immensely easier to unit test and maintain.
2. **Predictable Data Contracts**: The extensive use of DTOs (Data Transfer Objects) and Mappers ensures the API never accidentally leaks sensible database internals (like deleted status flags or cascading IDs). It strictly returns what the mapper shapes.
3. **Fail-Fast Validation Checkpoints**: Request validation with Zod isn't hardcoded into controllers. It operates at the router middleware level. Malformed requests instantly yield a `400 Bad Request` error before any business computation is wasted, optimizing service layer efficiency.

---

## 🔮 Future Improvements

- **Message Queuing**: Introduce job queues (e.g., BullMQ or RabbitMQ) for processing mass notification deployments asynchronously.
- **Caching Layer**: Integrate Redis to cache frequent reads (like channel configurations mapped to an App) and reduce database query roundtrips.
- **Comprehensive E2E Testing**: Add frameworks like Jest and Supertest. The current DI architecture makes mocking services and databases incredibly seamless.
- **Swagger/OpenAPI Documentation**: Automatically generate interactive API documentation from the existing Zod schemas.
