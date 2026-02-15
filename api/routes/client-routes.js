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

module.exports = router;