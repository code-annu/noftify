# Noftify Backend

A robust, scalable backend service built for multi-tenant application management, user tracking, and notification channel routing. Engineered with modern Node.js and TypeScript, this project emphasizes maintainability, strong typing, and modular architecture.

## 🚀 Tech Stack & Core Libraries

- **Platform & Framework:** Node.js, Express.js, TypeScript
- **Database & ORM:** PostgreSQL managed via Prisma (`@prisma/client` & `@prisma/adapter-pg`)
- **Validation:** Zod (for strict, type-safe API request validation)
- **Dependency Injection:** InversifyJS & Reflect-Metadata (promoting decoupled and testable code)
- **Authentication/Security:** Jose (for lightweight and modern JWT handling)

## 📁 Architecture & Design Patterns

The codebase is structured around a **Feature-Based Architecture**, rather than a standard MVC pattern. This scopes controllers, routers, and services by their domain, making the application easy to navigate and scale.

### Key Directories
- **`src/features/`**: Contains vertically sliced modules:
  - `profile`: Manages system owners and registration.
  - `apps`: Handles multi-tenant applications and unique API Key provisioning.
  - `app_users`: Tracks external end-users associated with specific apps.
  - `channels`: Configurations for communication channels (Email, SMS, Push providers).
- **`src/di/`**: Centralized Inversify Dependency Injection container setup.
- **`src/middleware/`**: Shared Express middlewares (e.g., JWT authorization checks).
- **`src/validator/`**: Zod schemas to guarantee data integrity before hitting services.

## 🗄️ Data Models Overview

- **Profile**: represents the administrators/owners creating multiple apps under an account.
- **App**: a tenant configured by a profile, holding a unique secure `api_key`.
- **AppUser**: end-users residing within an `App` boundary, identified via an `external_id`.
- **Channel**: notification delivery mechanisms. Stores dynamic configuration details securely via JSON.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### Installation & Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Ensure a `.env` file exists at the root of the `backend` directory.
   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/noftify"
   ```

3. **Database Preparation:**
   Generate Prisma client bindings:
   ```bash
   npx prisma generate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The API will now be listening locally at `http://localhost:<PORT>`.
