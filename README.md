# Full Stack Demo
Last Updated: February 2026

## Dependencies
1. ExpressJS: Server-side JS
2. Nodemon: Provides automatic reload during development

## Project Structure

```
.gitignore
package.json
README.md
api/
  server.js              # Express server that routes API requests and web pages
  routes/
    client-routes.js           # GET/POST routes for client data
    interaction-routes.js      # GET/POST routes for interaction data
  services/
    client-routes.js           # read/write to Clients DB
    interaction-routes.js      # read/write to Interactions DB
database/
  clients.json           # JSON file storing client records
  interactions.json      # JSON file storing interaction records
ui/
  index.html              # Main dashboard page
  client-behavior.js      # Client-side JS for client management
  interaction-behavior.js # Client-side JS for interaction management
  styles.css              # Dashboard styling
```

## Architecture Overview

### Frontend → Backend Communication
The frontend (HTML/JavaScript in the `ui/` folder) communicates with the backend via HTTP requests:

- **`ui/client-behavior.js`** makes fetch requests to `/api/clients`
  - `GET /api/clients` - loads all clients
  - `POST /api/clients` - creates a new client

- **`ui/interaction-behavior.js`** makes fetch requests to `/api/interactions`
  - `GET /api/interactions` - loads all interactions
  - `POST /api/interactions` - creates a new interaction

### Backend → Database Communication
The backend (Express server in `api/server.js`) handles API routes that read/write JSON files:

- **`api/routes/client-routes.js`** manages client data by reading/writing to `database/clients.json`
- **`api/routes/interaction-routes.js`** manages interaction data by reading/writing to `database/interactions.json`

Each route uses utility functions (`readJson`/`writeJson`) to serialize/deserialize data to/from the JSON files.