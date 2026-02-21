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

// PUT interaction summary by index
router.put('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { summary } = req.body;
    if (isNaN(index)) {
        return res.status(400).json({ message: 'Invalid interaction index' });
    }
    if (!summary) {
        return res.status(400).json({ message: 'summary is required' });
    }
    const updated = interactionServices.updateInteractionSummary(index, summary);
    if (!updated) {
        return res.status(404).json({ message: 'Interaction not found' });
    }
    res.json({ message: 'Interaction summary updated' });
});
// DELETE interaction by index
router.delete('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index)) {
        return res.status(400).json({ message: 'Invalid interaction index' });
    }
    const success = interactionServices.deleteInteractionByIndex(index);
    if (success) {
        res.json({ message: 'Interaction deleted' });
    } else {
        res.status(404).json({ message: 'Interaction not found' });
    }
});

module.exports = router;
