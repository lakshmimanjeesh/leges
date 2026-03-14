// --- PAGE 1: INPUT LOGIC ---
function fill(text) {
    const box = document.getElementById('scenario');
    if (box) { box.value = `I'm dealing with an issue regarding ${text.toLowerCase()}: `; }
}

function clearText() {
    const box = document.getElementById('scenario');
    if (box) { box.value = ''; }
}

async function startAnalysis() {
    const scenarioBox = document.getElementById('scenario');
    if (!scenarioBox || !scenarioBox.value.trim()) {
        alert("Please describe your situation first.");
        return;
    }

    // Set Default Data
    let data = {
        title: "Legal Procedure",
        s1: "Gather all related evidence including screenshots and receipts.",
        s2: "Organize files into a chronological folder.",
        s3: "Draft a formal notice of grievance.",
        s4: "Attempt a neutral mediation session.",
        s5: "Consult a lawyer for formal court filing."
    };

    const input = scenarioBox.value.toLowerCase();
    
    // AI Keyword Logic
    if (input.includes("fraud")) {
        data.title = "Fraud Recovery Roadmap";
        data.s1 = "Immediately freeze your bank accounts and cards.";
        data.s2 = "Save all transaction IDs and scammer screenshots.";
        data.s3 = "File a report on the National Cybercrime Portal.";
        data.s4 = "Send the FIR copy to your bank's Nodal Officer.";
        data.s5 = "Escalate to the Banking Ombudsman for recovery.";
    } else if (input.includes("landlord")) {
        data.title = "Tenant Protection Roadmap";
        data.s1 = "Review the 'Security Deposit' clause in your lease.";
        data.s2 = "Take photos of the flat to prove no damages.";
        data.s3 = "Send a formal notice for refund via Registered Post.";
        data.s4 = "Seek help from a local Tenant Association.";
        data.s5 = "Approach the Rent Control Board for a refund order.";
    }

    // SAVE EVERYTHING
    localStorage.setItem('title', data.title);
    localStorage.setItem('s1', data.s1);
    localStorage.setItem('s2', data.s2);
    localStorage.setItem('s3', data.s3);
    localStorage.setItem('s4', data.s4);
    localStorage.setItem('s5', data.s5);

    // MOVE TO NEXT PAGE
    window.location.href = 'procedures.html';
}

// --- PAGE 2: LOAD LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const titleTag = document.getElementById('page-title');
    
    // If we are on the procedures page, fill the text
    if (titleTag) {
        const storedTitle = localStorage.getItem('title');
        if (storedTitle) {
            titleTag.innerText = storedTitle;
            document.getElementById('step-1').innerText = localStorage.getItem('s1');
            document.getElementById('step-2').innerText = localStorage.getItem('s2');
            document.getElementById('step-3').innerText = localStorage.getItem('s3');
            document.getElementById('step-4').innerText = localStorage.getItem('s4');
            document.getElementById('step-5').innerText = localStorage.getItem('s5');
        }
    }

    // If we are on the lawyers page, load lawyer cards from the JSON file
    const grid = document.getElementById('grid');
    if (grid) {
        fetch('lawyers.json')
            .then(res => res.json())
            .then(lawyers => {
                grid.innerHTML = lawyers.map(lawyer => {
                    return `
                    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">${lawyer.name}</h3>
                                <p class="text-sm text-gray-600">${lawyer.field} • ${lawyer.city}</p>
                            </div>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full ${lawyer.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${lawyer.status}</span>
                        </div>

                        <p class="text-sm text-gray-700 mb-4">${lawyer.bio}</p>

                        <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                            <span class="inline-flex items-center gap-1"><strong>💼</strong> ${lawyer.experience} yrs</span>
                            <span class="inline-flex items-center gap-1"><strong>⭐</strong> ${lawyer.rating}</span>
                            <span class="inline-flex items-center gap-1"><strong>✔</strong> ${lawyer.match}% match</span>
                        </div>

                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-gray-900">₹${lawyer.fee}/hr</span>
                            <button class="btn-primary" onclick="alert('Contact info for ${lawyer.name} will be shared via the platform.')">Contact</button>
                        </div>
                    </div>
                    `;
                }).join('');
            })
            .catch(err => {
                grid.innerHTML = '<p class="text-red-600">Unable to load lawyer list. Please try again later.</p>';
                console.error('Failed to load lawyers.json', err);
            });
    }
});