# Mini-Shop

A simple e-commerce application with a **Nuxt.js** frontend and **Hapi.js** backend, powered by **Prisma** ORM and **PostgreSQL**.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Security & Rate Limiting](#security--rate-limiting)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Database Setup](#database-setup)
* [Running the Application](#running-the-application)
* [API Endpoints](#api-endpoints)
* [Contact](#contact)

## Features

* User registration & JWT authentication
* Role-based access control (USER / ADMIN)
* Product & Category management (CRUD)
* Shopping cart (add, update, remove items)
* Order checkout & history
* Address management (CRUD, set default)
* Image uploads handled via **Cloudinary**
* Validation via Zod
* API documentation with Swagger UI

## Tech Stack

* **Frontend:** Nuxt.js
* **Backend:** Hapi.js
* **ORM/ODM:** Prisma
* **Database:** PostgreSQL
* **Authentication:** JSON Web Tokens (JWT)
* **Image Storage:** Cloudinary
* **Error Handling:** Boom
* **Validation:** Zod
* **API Docs:** Swagger (Hapi Swagger)

## Prerequisites

* Node.js v14+ or v16+
* npm or yarn
* PostgreSQL instance
* Cloudinary Account (for API Key, Secret, and Cloud Name)

## Security & Rate Limiting

- **Rate Limiting:** 100 req/minute per IP (429 Too Many Requests เมื่อเกิน)  
- **Security Headers:**  
  - HSTS, X-Frame-Options, X-Content-Type-Options  
  - Content-Security-Policy, Referrer-Policy, Permissions-Policy  

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jonathan-dev2002/Mini-Shop.git
   cd mini-shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file at the project root with the following:

```ini
# Server
PORT=3000

# Database
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Database Setup

1. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```
2. **Run migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

## Running the Application

1. **Start the backend**

   ```bash
   npm run dev    # starts Hapi server on http://localhost:3000
   ```
2. **Start the frontend**

   ```bash
   cd frontend
   npm run dev -- -o    # starts Nuxt.js on http://localhost:3001
   ```

## API Endpoints

Visit **[http://localhost:3000/documentation](http://localhost:3000/documentation)** for interactive Swagger UI and full API reference.

### Authentication

* `POST /auth/login` – Login with email & password

### Users

* `POST /users` – Register new user
* `GET /users` – List users (Admin only)
* `GET /users/{id}` – Get user by ID
* `PUT /users/{id}` – Update user
* `DELETE /users/{id}` – Delete user

### Categories (Admin only for write ops)

* `GET /categories`
* `GET /categories/{id}`
* `POST /categories` (Admin)
* `PUT /categories/{id}` (Admin)
* `DELETE /categories/{id}` (Admin)

### Products (Admin only for write ops)

* `GET /products`
* `GET /products/{id}`
* `POST /products` (Admin)
* `PUT /products/{id}` (Admin)
* `DELETE /products/{id}` (Admin)

### Cart (Authenticated users)

* `GET /cart` – View current user’s cart
* `POST /cart/items` – Add item
* `PUT /cart/items/{id}` – Update quantity
* `DELETE /cart/items/{id}` – Remove item

### Orders (Authenticated users)

* `POST /orders` – Checkout
* `GET /orders` – List my orders
* `GET /orders/{id}` – Order details
* `PUT /orders/{id}/status` – Update status (Admin or via webhook)

### Addresses (Authenticated users)

* `POST /addresses` – Create a new address
* `GET /addresses` – Get all addresses for the user
* `GET /addresses/{id}` – Get a specific address
* `PUT /addresses/{id}` – Update an address
* `DELETE /addresses/{id}` – Delete an address
* `PUT /addresses/{id}/default` – Set an address as the default

### Reviews

* `POST /review` – Create a new review (Authenticated users)
* `GET /review` – Get all reviews for a product (e.g., /review?productId=1)
* `GET /review/{id}` – Get a single review by its ID
* `PUT /review/{id}` – Update your own review (Owner only)
* `DELETE /review/{id}` – Delete a review (Owner or Admin)

### Favorites (Authenticated users)
* `GET /favorites` – Get all favorite products for the current user
* `POST /favorites` – Add a product to favorites
* `DELETE /favorites/{productId}` – Remove a product from favorites

### Health-check & Metrics
- `GET /health`  
  Verifies that the application and database connection are healthy (returns 200 OK if everything is fine, 503 Service Unavailable if there’s a failure).
- `GET /metrics`  
  Exposes Prometheus-compatible metrics, including CPU usage, memory usage, HTTP request latency, request counts, and more.

## Contact

For questions or feedback, reach out to:

**Email:** [jonathandoillon2002@gmail.com](mailto:jonathandoillon2002@gmail.com)
