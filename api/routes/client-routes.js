const express = require("express");
const router = express.Router();
const clientServices = require("../services/client-services");

// GET all clients
router.get("/", (req, res) => {
    const clients = clientServices.getClients();
    res.json(clients);
});

// POST new client
router.post("/", (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ message: "name and address are required" });
    }

    const clients = clientServices.getClients();

    const exists = clients.find(c => c.name === name);
    if (exists) {
        return res.status(409).json({ message: "client already exists" });
    }

    const newClient = { name, address };

    clientServices.createClient(newClient);

    res.status(201).json(newClient);
});

// PUT client address by name
router.put('/:name', (req, res) => {
    const name = req.params.name;
    const { address } = req.body;
    if (!address) {
        return res.status(400).json({ message: 'address is required' });
    }
    const updated = clientServices.updateClientAddress(name, address);
    if (!updated) {
        return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client address updated' });
});
// DELETE client by name (and cascade delete interactions)
const interactionServices = require("../services/interaction-services");
router.delete('/:name', (req, res) => {
    const name = req.params.name;
    const clients = clientServices.getClients();
    const exists = clients.find(c => c.name === name);
    if (!exists) {
        return res.status(404).json({ message: 'Client not found' });
    }
    clientServices.deleteClientByName(name);
    interactionServices.deleteInteractionsByClient(name);
    res.json({ message: 'Client and related interactions deleted' });
});

module.exports = router;