# CYBERSHIELD

A defensive cybersecurity awareness platform built with React, Vite, TypeScript, Express, and JWT-based authentication.

## Features

- Premium cybersecurity dashboard
- Password strength analysis on the client side
- Phishing risk analyzer with safe educational guidance
- Website security checker for authorized sites only
- Incident investigation simulator using synthetic data
- Learning center and security quiz
- Admin role access and protected routes
- Mock data and API design for easy future database integration

## Quick Start

1. Install dependencies:

```bash
npm install
npm --prefix client install
npm --prefix server install
```

2. Copy environment variables:

```bash
copy .env.example .env
```

3. Start the app:

```bash
npm run dev
```

4. Open the frontend at http://localhost:5173

To test the MongoDB Atlas connection without starting the application:

```bash
npm --prefix server run test:db
```

## Local demo fallback

The development fallback data is retained for local walkthroughs. It is disabled when `NODE_ENV=production`; production authentication requires MongoDB users.

## Important notes

- Passwords are hashed before storage in the backend.
- The phishing and website checks are educational and safe; they are limited to synthetic or authorized sites.
- MongoDB is required for production authentication and is configured via `MONGODB_URI`.

## Project structure

- client/: React + Vite + Tailwind frontend
- server/: Express + TypeScript API
- .env.example: environment configuration template

## Render deployment preparation

The repository includes [render.yaml](./render.yaml) for a separate Render API service and static frontend site. This file does not contain secret values.

### Backend service

- Service type: Web Service
- Name: `cybershield-api`
- Root directory: `server`
- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Health check path: `/api/health`
- Required environment variable names: `NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`

Set `CLIENT_URL` to the deployed frontend URL. Set the other values directly in Render's environment settings; do not commit them.

### Frontend static site

- Service type: Static Site
- Name: `cybershield-client`
- Root directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Required environment variable name: `VITE_API_URL`

Set `VITE_API_URL` to the deployed backend URL before building the static site. The SPA rewrite in [render.yaml](./render.yaml) keeps client-side routes working on refresh.

For a manual setup, use the same settings shown above. Render can also create both services from `render.yaml`; review the generated service URLs and enter the environment variable values in the Render dashboard before deploying.
