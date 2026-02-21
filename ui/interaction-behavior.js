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
                <div style='display:flex;align-items:center;justify-content:space-between;'>
                    <span><strong>${interaction.client}</strong> — ${interaction.date} ${interaction.time}<br/>${interaction.summary}</span>
                    <div>
                        <button class='edit-btn' onclick='openInteractionModal(${interactions.indexOf(interaction)}, \"${interaction.summary.replace(/"/g, '&quot;')}\")'>Edit</button>
                        <button class='delete-btn' onclick='deleteInteraction(${interactions.indexOf(interaction)})'>Delete</button>
                    </div>
                </div>
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
// Edit interaction modal logic
function openInteractionModal(index, summary) {
    document.getElementById('editInteractionIndex').value = index;
    document.getElementById('editInteractionSummary').value = summary;
    document.getElementById('editInteractionModal').style.display = 'block';
}
function closeInteractionModal() {
    document.getElementById('editInteractionModal').style.display = 'none';
}
async function submitInteractionEdit(event) {
    event.preventDefault();
    const index = document.getElementById('editInteractionIndex').value;
    const summary = document.getElementById('editInteractionSummary').value;
    const res = await fetch(`/api/interactions/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary })
    });
    if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
    }
    closeInteractionModal();
    await loadInteractions();
}
// Delete interaction handler
async function deleteInteraction(index) {
    // Show custom modal
    showDeleteInteractionModal(index);
}

function showDeleteInteractionModal(index) {
    document.getElementById('deleteInteractionText').textContent = 'Delete this interaction?';
    document.getElementById('deleteInteractionModal').style.display = 'block';
    document.getElementById('confirmDeleteInteractionBtn').onclick = async function () {
        const res = await fetch(`/api/interactions/${index}`, { method: "DELETE" });
        if (!res.ok) {
            const err = await res.json();
            alert(err.message);
            return;
        }
        closeDeleteInteractionModal();
        await loadInteractions();
    };
}

function closeDeleteInteractionModal() {
    document.getElementById('deleteInteractionModal').style.display = 'none';
    document.getElementById('confirmDeleteInteractionBtn').onclick = null;
}