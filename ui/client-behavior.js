async function loadClients() {
    try {
        const res = await fetch("/api/clients");

        if (!res.ok) {
            throw new Error("Failed to load clients");
        }

        const clients = await res.json();

        const list = document.getElementById("clientsList");
        const dropdown = document.getElementById("interactionClient");

        list.innerHTML = "";
        dropdown.innerHTML = "";

        clients.forEach(client => {
            // List rendering
            const li = document.createElement("li");
            li.className = "card";
            li.textContent = `${client.name} — ${client.address}`;
            list.appendChild(li);

            // Dropdown population
            const option = document.createElement("option");
            option.value = client.name;
            option.textContent = client.name;
            dropdown.appendChild(option);
        });

    } catch (err) {
        console.error("Error loading clients:", err);
    }
}

async function createClient() {
    const name = document.getElementById("clientName").value;
    const address = document.getElementById("clientAddress").value;

    if (!name || !address) {
        alert("Both name and address are required.");
        return;
    }

    const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address })
    });

    if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
    }

    document.getElementById("clientName").value = "";
    document.getElementById("clientAddress").value = "";

    await loadClients();
}

loadClients();