const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../database/clients.json");

// Read all data from the JSON file
function getClients() {
  const raw = fs.readFileSync(dbPath);
  return JSON.parse(raw);
}

// Add a new client and write the new JSON to the file
function createClient(data) {
  const clients = getClients();
  clients.push(data);
  fs.writeFileSync(dbPath, JSON.stringify(clients, null, 2));
}

module.exports = {
  getClients,
  createClient
};