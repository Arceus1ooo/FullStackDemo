const express = require("express");
const router = express.Router();
const clientServices = require("../services/client-services");
const interactionServices = require("../services/interaction-services");

// GET all interactions
router.get("/", (req, res) => {
    const interactions = interactionServices.getInteractions();
    res.json(interactions);
});

// POST new interaction
router.post("/", (req, res) => {
    const { date, time, client, summary } = req.body;

    if (!date || !time || !client || !summary) {
        return res.status(400).json({
            message: "date, time, client, and summary are required"
        });
    }

    const clients = clientServices.getClients();

    const clientExists = clients.find(c => c.name === client);
    if (!clientExists) {
        return res.status(400).json({
            message: "referenced client does not exist"
        });
    }

    const newInteraction = {
        date,
        time,
        client,
        summary
    };

    interactionServices.createInteraction(newInteraction);

    res.status(201).json(newInteraction);
});

module.exports = router;
