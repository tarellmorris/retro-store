# Retro Store

Retro Store is a full-stack demo storefront for browsing and buying second-hand
video games from the NES, SNES, Sega Genesis, Game Boy, and PlayStation eras.
It was built as a practical exploration of a containerized application with a
Next.js frontend, a Spring Boot API, cookie-based JWT authentication, persistent
cart state, and relational data.

The game catalog is ready to browse without an account. After signing in, a
shopper can add games to a cart, change quantities, and remove items. The
backend also exposes a checkout operation that validates inventory and closes
the active cart.

![Retro Store home page](screenshots/Screenshot%202026-06-14%20at%2011.35.49%E2%80%AFAM.png)

## Features

- Responsive landing page and retro-inspired storefront
- Seeded catalog of 24 games across five classic platforms
- Server-rendered, paginated game inventory
- Server-rendered game details pages at `/details/{id}`
- Configurable catalog page size, sorting field, and sort direction
- Email registration and sign-in flow
- Stateless Spring Security authentication using a JWT in an HTTP-only cookie
- Persistent, user-specific shopping carts
- Shared add-to-cart behavior from catalog cards and detail pages
- Cart quantity updates, item removal, subtotal calculation, and auth-aware
  cart refresh after login
- Checkout API with final stock validation and inventory reduction
- Nginx reverse proxy providing one origin for the frontend and API
- Docker Compose development and production configurations

## Storefront

The `/games` route fetches inventory from the Spring Boot API and displays the
current price and available quantity for every title. Results default to nine
games per page and are sorted by name. Clicking a game's artwork navigates to
`/details/{id}`, which fetches one game by ID and renders a larger product view
with the long description, image, price, stock count, and an Add to cart button.

![Paginated game catalog](screenshots/Screenshot%202026-06-14%20at%2011.36.09%E2%80%AFAM.png)

The catalog API accepts `page`, `size`, `sortBy`, and `direction` query
parameters. Page size is capped at 50 by the backend.

![Catalog pagination](screenshots/Screenshot%202026-06-14%20at%2011.36.57%E2%80%AFAM.png)

## Authentication and cart behavior

Visitors can browse the catalog without signing in. Attempting to add a game to
the cart redirects an unauthenticated visitor to `/login`, preserving the page
they came from.

Registration stores a BCrypt password hash. A successful login places a signed
JWT in an HTTP-only `AUTH` cookie, and protected requests use that cookie to
identify the current user. The backend does not create an HTTP session.

Each user has one active cart. Adding the same title again increases its
quantity, while the cart drawer can update a quantity or remove an item by
setting its quantity to zero. The API stores the price captured when the item
was added and uses it to calculate line totals and the cart subtotal.

Cart state is managed by the frontend cart context. The shared Add to cart
button calls the same `addToCart` action from both catalog cards and detail
pages, then refreshes the active cart. The cart provider also watches the
authenticated user state: after a first login or registration it re-fetches the
cart immediately, so the floating cart button can appear without requiring a
manual refresh or a second cart action.

![Shopping cart drawer](screenshots/Screenshot%202026-06-14%20at%2011.36.30%E2%80%AFAM.png)

The checkout API validates stock one final time, reduces inventory, and marks
the cart as `CHECKED_OUT`. A later cart request creates a new active cart for
that user. The drawer currently renders a Checkout button, but its click handler
is not yet connected to this endpoint.

## Architecture

```text
Browser
   |
   | http://localhost
   v
Nginx :80
   |--------------------------|
   | /                        | /api/*
   v                          v
Next.js :3000             Spring Boot :8080
                                  |
                                  v
                             MariaDB :3306
```

Nginx gives the browser a single origin:

- UI requests are forwarded to Next.js.
- `/api/*` requests are forwarded to Spring Boot.
- Server-side Next.js requests call the backend over the internal Compose
  network using `INTERNAL_API_BASE`.

The Compose stack contains four services:

| Service | Container | Purpose | Host port |
| --- | --- | --- | --- |
| `nginx` | `nginx` | Reverse proxy and public entry point | `80` |
| `frontend` | `next-js` | Next.js App Router application | `3000` |
| `backend` | `spring-mvc` | Spring Boot REST API | `8080` |
| `database` | `maria-db` | Persistent application data | `3307` |

## Technology

### Frontend

- Next.js 16 with the App Router
- React 19 and TypeScript
- HeroUI components
- Tailwind CSS 4
- React context for user and cart state

### Backend

- Java 21 toolchain
- Spring Boot 3.3
- Spring Web, Data JPA, Security, and Validation
- JJWT for token generation and parsing
- BCrypt password hashing
- Gradle

### Infrastructure and data

- MariaDB
- Nginx
- Docker Compose with development overrides and file watching
- H2 for backend tests

## Project structure

```text
.
├── compose.yaml                 # Base four-service stack
├── compose.override.yaml        # Development targets and live file sync
├── compose.prod.yaml            # Production build targets
├── nginx.conf                   # Frontend/API reverse-proxy routing
├── scripts/
│   └── init.sql                 # Schema and initial game inventory
├── src/main/java/
│   ├── Dockerfile
│   └── com/store/retro/
│       ├── config/              # Spring Security and JWT request filter
│       ├── controllers/         # Authentication, catalog, and cart API
│       ├── models/              # JPA entities and API DTOs
│       ├── repositories/        # Spring Data repositories
│       ├── services/            # Service contracts and implementations
│       └── utils/               # Authentication cookie helpers
├── src/main/resources/
│   └── application.yml          # MariaDB, JPA, and JWT configuration
├── src/main/frontend/
│   ├── app/                     # App Router pages and global layout
│   ├── components/              # Storefront, login, and cart UI
│   │   └── add-to-cart-button.tsx
│   ├── context/                 # User and cart providers
│   ├── public/                  # Store imagery and game artwork
│   └── Dockerfile
└── src/test/                    # Spring application and security tests
```

## API overview

Public endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/games` | Return a paginated and sorted game catalog |
| `GET` | `/api/games/{id}` | Return one game for the details page |
| `GET` | `/api/auth/user/exists?email=...` | Check whether an email is registered |
| `POST` | `/api/auth/register` | Create a user |
| `POST` | `/api/auth/login` | Authenticate and set the `AUTH` cookie |
| `POST` | `/api/auth/logout` | Delete the authentication cookie |

Authenticated endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/auth/me` | Return the signed-in user's ID and email |
| `GET` | `/api/cart` | Get or create the user's active cart |
| `POST` | `/api/cart/items` | Add a game and quantity to the cart |
| `PUT` | `/api/cart/items/{gameId}` | Replace an item's quantity |
| `DELETE` | `/api/cart/items/{gameId}` | Remove an item |
| `POST` | `/api/cart/checkout` | Validate stock, decrement it, and close the cart |

Example catalog request:

```http
GET /api/games?page=0&size=9&sortBy=name&direction=ASC
```

Example details request:

```http
GET /api/games/1
```

Example add-to-cart body:

```json
{
  "gameId": 1,
  "quantity": 1
}
```

## Run locally

### Prerequisites

- Docker Desktop with Docker Compose and Compose Watch
- JDK 21
- Node.js and npm

The Makefile performs local frontend and backend builds before creating the
development containers.

```bash
make
```

This command cleans previous build output, runs the Gradle build and tests,
installs frontend dependencies, builds Next.js, rebuilds the images, and starts
the stack with file watching.

Open:

- Application through Nginx: [http://localhost](http://localhost)
- Next.js directly: [http://localhost:3000](http://localhost:3000)
- Spring Boot API directly: [http://localhost:8080](http://localhost:8080)
- MariaDB from the host: `localhost:3307`

Stop the stack with:

```bash
make down
```

Other useful commands:

```bash
make build   # Build and test the backend, then build the frontend
make lint    # Run the frontend ESLint task
make clean   # Remove Gradle, Next.js, and frontend dependency output
make start   # Rebuild images and start Compose Watch
```

### Production configuration

`compose.prod.yaml` selects the frontend production image stage and supplies
production environment values. The included production container setup is a
starting point rather than a documented deployment workflow; the development
stack is the currently supported way to run the complete application.

## Database initialization and reset

MariaDB stores its files in the named `mariadb_data` volume. On the first
startup, `scripts/init.sql` creates the user, cart, cart-item, and inventory
tables and inserts the demo catalog.

The initialization script does not rerun while the volume already contains a
database. To discard local accounts, carts, and inventory changes and restore
the seed data:

```bash
docker compose down -v
make
```

That command permanently deletes the local Retro Store database volume.

## Configuration

The development defaults are defined in the Compose and Spring configuration
files:

| Variable | Purpose | Development value |
| --- | --- | --- |
| `JWT_SECRET` | Signs and verifies authentication tokens | Demo value in `compose.override.yaml` |
| `INTERNAL_API_BASE` | Backend URL used by server-rendered Next.js routes | `http://backend:8080` |
| `NEXT_PUBLIC_API_BASE` | Browser-facing API base, where needed | `http://localhost` |

Database credentials and the JWT secret are intentionally committed demo
defaults. Replace them with environment-managed secrets before using this
project outside local development. Production deployments should also serve
HTTPS and mark the authentication cookie as secure.

## Tests

Run the backend test suite with:

```bash
./gradlew test
```

Tests use an in-memory H2 database and currently cover application startup plus
the public/protected Spring Security route boundaries.

Run frontend linting with:

```bash
cd src/main/frontend
npm ci
npm run lint
```

## Current scope

Retro Store is an educational demo rather than a production commerce system.
The Music and Electronics categories are placeholders. Game detail pages and
shared Add to cart actions are wired, but the checkout UI action is not yet
connected to the checkout endpoint. There is no payment processing, shipping,
order history, or administration interface.
