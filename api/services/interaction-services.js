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

// Delete interaction by index
function deleteInteractionByIndex(index) {
    const interactions = getInteractions();
    if (index < 0 || index >= interactions.length) return false;
    interactions.splice(index, 1);
    fs.writeFileSync(interactionsPath, JSON.stringify(interactions, null, 2));
    return true;
}
// Delete interactions by client name
function deleteInteractionsByClient(clientName) {
    let interactions = getInteractions();
    interactions = interactions.filter(i => i.client !== clientName);
    fs.writeFileSync(interactionsPath, JSON.stringify(interactions, null, 2));
}

// Update interaction summary by index
function updateInteractionSummary(index, newSummary) {
    const interactions = getInteractions();
    if (index < 0 || index >= interactions.length) return false;
    interactions[index].summary = newSummary;
    fs.writeFileSync(interactionsPath, JSON.stringify(interactions, null, 2));
    return true;
}

module.exports = {
    getInteractions,
    createInteraction,
    deleteInteractionByIndex,
    deleteInteractionsByClient,
    updateInteractionSummary
};