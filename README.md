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
    client-routes.js           # GET/POST/PUT/DELETE routes for client data
    interaction-routes.js      # GET/POST/PUT/DELETE routes for interaction data
  services/
    client-services.js         # read/write to Clients DB
    interaction-services.js    # read/write to Interactions DB
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
- **`ui/interaction-behavior.js`** makes fetch requests to `/api/interactions`

### Backend → Database Communication
The backend (Express server in `api/server.js`) handles API routes that read/write JSON files:

- **`api/routes/client-routes.js`** manages client data by reading/writing to `database/clients.json`
- **`api/routes/interaction-routes.js`** manages interaction data by reading/writing to `database/interactions.json`

Each route uses utility functions (`readJson`/`writeJson`) to serialize/deserialize data to/from the JSON files.

## Usage

### 1. Install dependencies
Run the following command in the project root:

    npm install

### 2. Start the server
For development (auto-reload):

    npm run dev

Or for production:

    npm start

### 3. Access the dashboard
Open `ui/index.html` in your browser to view the dashboard.

## API Endpoints

### Client APIs (`/api/clients`)
- `GET /api/clients` — Retrieve all clients
- `POST /api/clients` — Add a new client (requires `name` and `address`)
- `PUT /api/clients/:name` — Update client address by name (requires `address`)
- `DELETE /api/clients/:name` — Delete client by name (also deletes related interactions)

### Interaction APIs (`/api/interactions`)
- `GET /api/interactions` — Retrieve all interactions
- `POST /api/interactions` — Add a new interaction (requires `date`, `time`, `client`, `summary`)
- `PUT /api/interactions/:index` — Update interaction summary by index (requires `summary`)
- `DELETE /api/interactions/:index` — Delete interaction by index

## Notes
- Data is stored in JSON files under the `database/` folder.
- The `.gitignore` file ensures `node_modules` and other unnecessary files are not tracked by git.

## License
MIT