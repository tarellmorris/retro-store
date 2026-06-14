# Retro Store

## What is Retro Store?

A web application for the Retro Store, a retro electronics storefront. This is a demo application built for educational
purposes.
I wanted to explore a fullstack architecture and get hands-on experience with Spring Boot, Next.js, and Docker. I
especially wanted to explore
authentication flows and get some database experience.

![Screenshot 2026-06-14 at 11.35.49 AM.png](screenshots/Screenshot%202026-06-14%20at%2011.35.49%E2%80%AFAM.png)

### How does it work?

Retro Store is a complete Docker application that containerizes a frontend, backend, database, and proxy. It is built
with Next.js and TypeScript on the frontend,
and Java and Spring Boot on the backend - leveraging MariaDB for persistent storage and Nginx for cross-origin resource
sharing.

![Screenshot 2026-06-14 at 11.36.09 AM.png](screenshots/Screenshot%202026-06-14%20at%2011.36.09%E2%80%AFAM.png)

### What happens on the frontend?

The frontend is a Next.js application that provides a user interface for interacting with the backend. It is built with
TypeScript and uses the Heroui UI library for styling.
Users can create and account and browse a selection of retro video games. Users can add available stock to their cart
and interact with their selections through an always available cart drawer.

![Screenshot 2026-06-14 at 11.36.30 AM.png](screenshots/Screenshot%202026-06-14%20at%2011.36.30%E2%80%AFAM.png)

### What happens on the backend?

The backend is a Java application that provides a REST API for interacting with the database. It is built with Spring
Boot and uses MariaDB for persistent storage. The backend handles user authentication and authorization, game stock
management including pagination, and cart management.

![Screenshot 2026-06-14 at 11.36.57 AM.png](screenshots/Screenshot%202026-06-14%20at%2011.36.57%E2%80%AFAM.png)

### What happens in the database?

The database is a MariaDB database that stores user, cart, and game information. A script is run to initialize the
database to a clean state for demo purposes.

### What happens in the proxy?

The proxy is a Nginx server that provides reverse proxy functionality for the frontend and backend. It forwards requests
from a
centralized location so network calls function locally and in production seamlessly.

## How to run

Retro Store uses a singular Makefile for building and running the application.
Simply run the `make` command from root to do a clean and complete build, then open `localhost:3000` in your browser.