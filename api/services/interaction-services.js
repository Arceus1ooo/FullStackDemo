const fs = require("fs");
const path = require("path");

const interactionsPath = path.join(__dirname, "../../database/interactions.json");

// Read all data from the JSON file
function getInteractions() {
    const raw = fs.readFileSync(interactionsPath);
    return JSON.parse(raw);
}

// Add a new interaction and write the new JSON to the file
function createInteraction(data) {
    const interactions = getInteractions();
    interactions.push(data);
    fs.writeFileSync(interactionsPath, JSON.stringify(interactions, null, 2));
}

module.exports = {
    getInteractions,
    createInteraction
};