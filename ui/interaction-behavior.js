async function loadInteractions() {
    try {
        const res = await fetch("/api/interactions");

        if (!res.ok) {
            throw new Error("Failed to load interactions");
        }

        const interactions = await res.json();

        const list = document.getElementById("interactionsList");
        list.innerHTML = "";

        interactions.forEach(interaction => {
            const li = document.createElement("li");
            li.className = "card";
            li.innerHTML = `
                <strong>${interaction.client}</strong> —
                ${interaction.date} ${interaction.time}
                <br/>
                ${interaction.summary}
            `;
            list.appendChild(li);
        });

    } catch (err) {
        console.error("Error loading interactions:", err);
    }
}

async function createInteraction() {
    const date = document.getElementById("interactionDate").value;
    const time = document.getElementById("interactionTime").value;
    const client = document.getElementById("interactionClient").value;
    const summary = document.getElementById("interactionSummary").value;

    if (!date || !time || !client || !summary) {
        alert("All fields are required.");
        return;
    }

    const res = await fetch("/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, client, summary })
    });

    if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
    }

    document.getElementById("interactionSummary").value = "";

    await loadInteractions();
}

loadInteractions();