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
            li.innerHTML = `<div style='display:flex;align-items:center;justify-content:space-between;'><span>${client.name} — ${client.address}</span><button class='delete-btn' onclick='deleteClient(\"${client.name}\")'>Delete</button></div>`;
            li.innerHTML = `<div style='display:flex;align-items:center;justify-content:space-between;'>
                <span>${client.name} — ${client.address}</span>
                <div>
                    <button class='edit-btn' onclick='openClientModal("${client.name}", "${client.address}")'>Edit</button>
                    <button class='delete-btn' onclick='deleteClient("${client.name}")'>Delete</button>
                </div>
            </div>`;
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
// Edit client modal logic
function openClientModal(name, address) {
    document.getElementById('editClientName').value = name;
    document.getElementById('editClientAddress').value = address;
    document.getElementById('editClientModal').style.display = 'block';
}
function closeClientModal() {
    document.getElementById('editClientModal').style.display = 'none';
}
async function submitClientEdit(event) {
    event.preventDefault();
    const name = document.getElementById('editClientName').value;
    const address = document.getElementById('editClientAddress').value;
    const res = await fetch(`/api/clients/${encodeURIComponent(name)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
    });
    if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
    }
    closeClientModal();
    await loadClients();
}
// Delete client handler
async function deleteClient(name) {
    // Show custom modal
    showDeleteClientModal(name);
}

function showDeleteClientModal(name) {
    document.getElementById('deleteClientText').textContent = `Delete client '${name}' and all its interactions?`;
    document.getElementById('deleteClientModal').style.display = 'block';
    document.getElementById('confirmDeleteClientBtn').onclick = async function () {
        const res = await fetch(`/api/clients/${encodeURIComponent(name)}`, { method: "DELETE" });
        if (!res.ok) {
            const err = await res.json();
            alert(err.message);
            return;
        }
        closeDeleteClientModal();
        await loadClients();
        if (typeof loadInteractions === 'function') loadInteractions();
    };
}

function closeDeleteClientModal() {
    document.getElementById('deleteClientModal').style.display = 'none';
    document.getElementById('confirmDeleteClientBtn').onclick = null;
}