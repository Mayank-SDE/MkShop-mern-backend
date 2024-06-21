# MkShop MERN Backend

![Node.js](https://img.shields.io/badge/node-v14.17.5-green)
![Express.js](https://img.shields.io/badge/express-v4.17.1-blue)
![MongoDB](https://img.shields.io/badge/mongodb-v4.4.12-green)
![Mongoose](https://img.shields.io/badge/mongoose-v6.1.2-blue)
![Passport.js](https://img.shields.io/badge/passport-v0.4.1-yellow)
![Stripe](https://img.shields.io/badge/stripe-v8.182.0-blueviolet)
![Jest](https://img.shields.io/badge/jest-v27.4.7-red)
![License](https://img.shields.io/badge/license-MIT-green)

<p align="left"> <img src="https://komarev.com/ghpvc/?username=mayank-sde&label=Profile%20views&color=0e75b6&style=flat" alt="mayank-sde" /> </p>

This repository contains the backend server for MkShop, an e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [Authentication](#authentication)
  - [Local Authentication](#local-authentication)
  - [Google OAuth2 Authentication](#google-oauth2-authentication)
  - [GitHub OAuth2 Authentication](#github-oauth2-authentication)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Products](#products)
  - [Orders](#orders)
  - [Coupons](#coupons)
  - [Payments](#payments)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

MkShop is an e-commerce platform designed to provide users with a seamless shopping experience. This repository houses the backend server responsible for handling user authentication, product management, order processing, coupon creation, payment integration, and more.

## Features

- **Authentication**: Implementing user authentication with Passport.js using local strategy, Google OAuth2, and GitHub OAuth2.
- **Authorization**: Role-based access control (RBAC) for admin and regular users.
- **Products**: CRUD operations for managing products, including image uploads and caching.
- **Orders**: Management of orders with status tracking (Placed, Picked, Packed, Shipped, Delivered).
- **Coupons**: Creation, retrieval, and deletion of discount coupons.
- **Payments**: Integration with Stripe for handling payment intents.
- **Caching**: Implementation of caching strategies for products and orders using NodeCache.
- **Error Handling**: Centralized error handling with custom error classes.
- **Testing**: Automated testing setup for robust code verification.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Passport.js (local, Google OAuth2, GitHub OAuth2)
- **Payment Integration**: Stripe API
- **Caching**: NodeCache
- **Testing**: Jest, Supertest

## Prerequisites

Before running the server, make sure you have the following installed:

- Node.js v14.17.5 or higher
- MongoDB v4.4.12 or higher
- Stripe API keys (for payment integration)
- Google OAuth2 credentials (client ID and client secret)
- GitHub OAuth2 credentials (client ID and client secret)

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/Mayank-SDE/MkShop-mern-backend.git
cd MkShop-mern-backend
## Installation

Install dependencies:

```bash
npm install
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

Running the Server
Start the server using the following command:

bash
npm start
Authentication
Local Authentication

Register a New User:
POST /api/auth/register
Create a new user account.

User Login:
POST /api/auth/login
Authenticate user credentials and generate JWT token.

Google OAuth2 Authentication
Initiate Google OAuth2 Login:
GET /api/auth/google
Redirects to Google OAuth2 consent screen.

Google OAuth2 Callback:
GET /api/auth/google/callback
Google OAuth2 callback URL.

GitHub OAuth2 Authentication

Initiate GitHub OAuth2 Login:
GET /api/auth/github

Redirects to GitHub OAuth2 consent screen.

GitHub OAuth2 Callback:
GET /api/auth/github/callback
GitHub OAuth2 callback URL.

**API Endpoints

Users

Get User Profile:
GET /api/users/profile

Update User Profile:
PUT /api/users/profile/update

Delete User Account:
DELETE /api/users/profile/delete

Products

Create a New Product:
POST /api/products/new

Get Latest Products:
GET /api/products/latest

Get Brands by Category:
GET /api/products/brands

Get Categories by Brand:
GET /api/products/categories

Get All Products:
GET /api/products/all

Get a Single Product by ID:
GET /api/products/:id

Update a Product by ID:
PUT /api/products/:id

Delete a Product by ID:
DELETE /api/products/:id

Search Products:
GET /api/products/search

Orders

Place a New Order:
POST /api/orders/new

Get Orders for the Authenticated User:
GET /api/orders/my

Get All Orders:
GET /api/orders/all

Get a Single Order by ID:
GET /api/orders/:id

Process an Order (Change Status):
PUT /api/orders/:id/process

Delete an Order by ID:
DELETE /api/orders/:id

Coupons

Create a New Coupon:
POST /api/coupons/new

Get All Coupons:
GET /api/coupons/all

Delete a Coupon by ID:
DELETE /api/coupons/:id

Payments

Create a Payment Intent:
POST /api/payments/create-payment-intent

Apply a Coupon Discount:
POST /api/payments/apply-discount

Testing

Run automated tests using:

bash

npm test
Deployment
Deploy the MkShop backend to platforms like Heroku, AWS, or any other cloud provider. Ensure to set up environment variables in your deployment environment.

Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

