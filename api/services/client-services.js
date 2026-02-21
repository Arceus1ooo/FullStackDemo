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

// Delete client by name
function deleteClientByName(clientName) {
  let clients = getClients();
  clients = clients.filter(c => c.name !== clientName);
  fs.writeFileSync(dbPath, JSON.stringify(clients, null, 2));
}

// Update client address by name
function updateClientAddress(clientName, newAddress) {
  let clients = getClients();
  let updated = false;
  clients = clients.map(c => {
    if (c.name === clientName) {
      updated = true;
      return { ...c, address: newAddress };
    }
    return c;
  });
  fs.writeFileSync(dbPath, JSON.stringify(clients, null, 2));
  return updated;
}

module.exports = {
  getClients,
  createClient,
  deleteClientByName,
  updateClientAddress
};